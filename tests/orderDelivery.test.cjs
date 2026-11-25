/* eslint-disable @typescript-eslint/no-require-imports -- This test uses Node’s CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const loadSource = require("./helpers/loadSource.cjs");
const { getOrderActions, getSaleActions, getTrackingSteps, formatDeliveryDate } = loadSource("src/features/orders/helpers/orderDelivery.ts");

test("buyer actions follow all six delivery states, independently of payment status", () => {
  const expectations = {
    orderConfirmed: [true, false, false, false, false],
    outForDelivery: [false, false, false, false, false],
    delivered: [false, true, true, true, true],
    received: [false, false, true, true, false],
    canceled: [false, false, false, false, false],
    returned: [false, false, false, false, false],
  };
  for (const [deliveryStatus, expected] of Object.entries(expectations)) {
    for (const paymentStatus of ["paid", "unpaid", "pending", "failed"]) {
      const a = getOrderActions({ deliveryStatus, paymentStatus });
      assert.deepEqual([a.canCancel, a.canReceive, a.canReturn, a.canReorder, a.canReview], expected, `${deliveryStatus}/${paymentStatus}`);
      assert.equal(a.canTrack, true);
      if (deliveryStatus !== "orderConfirmed") assert.equal(a.canPay, false);
    }
  }
});

test("seller dispatch, delivery and cancellation are available only at the requested stages", () => {
  for (const status of ["orderConfirmed", "outForDelivery", "delivered", "received", "canceled", "returned"]) {
    assert.deepEqual(getSaleActions(status), {
      canCancel: status === "orderConfirmed", canDispatch: status === "orderConfirmed", canDeliver: status === "outForDelivery",
    });
  }
});

test("tracking retains six stages, completed timestamps, and the next pending stage", () => {
  const confirmed = "2026-11-20T19:12:46.897Z";
  const dispatched = "2026-11-21T10:00:00.000Z";
  const steps = getTrackingSteps({ deliveryStatus: "outForDelivery", deliveryStatusUpdatedAt: dispatched,
    orderSteps: [{ status: "orderConfirmed", isCompleted: true, activatedAt: confirmed }],
    timeline: [], deliveredAt: null, deliveryDate: null });
  assert.equal(steps.length, 6);
  assert.deepEqual(steps.filter((s) => s.isCompleted).map((s) => [s.status, s.timestamp]), [["orderConfirmed", confirmed], ["outForDelivery", dispatched]]);
  assert.deepEqual(steps.filter((s) => s.isNext).map((s) => s.status), ["delivered"]);
  assert.ok(steps.filter((s) => !s.isCompleted).every((s) => !s.timestamp));
});

test("canceled and returned do not imply successful delivery or a next stage", () => {
  for (const status of ["canceled", "returned"]) {
    const steps = getTrackingSteps({ deliveryStatus: status, deliveryStatusUpdatedAt: "2026-11-21T10:00:00Z", timeline: [{ status: "orderConfirmed", timestamp: "2026-11-20T10:00:00Z" }] });
    assert.deepEqual(steps.filter((s) => s.isCompleted).map((s) => s.status), ["orderConfirmed", status]);
    assert.equal(steps.some((s) => s.isNext), false);
  }
});

test("empty history does not invent past timestamps or mark alternate outcomes as next", () => {
  const steps = getTrackingSteps({ deliveryStatus: "received", timeline: [] });
  assert.equal(steps.some((s) => s.timestamp || s.isNext), false);
  assert.deepEqual(steps.filter((s) => s.isCompleted).map((s) => s.status), ["orderConfirmed", "outForDelivery", "delivered", "received"]);
  assert.equal(formatDeliveryDate("invalid"), "");
  assert.match(formatDeliveryDate("2026-11-20T23:30:00Z"), /21 November 2026/);
});

test("sales fetch uses sale filters; delivery updates use the parent order ID", async () => {
  const calls = [];
  const axiosInstance = { get: async (...args) => { calls.push(args); return { data: { data: { sales: [] } } }; }, patch: async (...args) => { calls.push(args); return { data: { message: "success" } }; } };
  const api = loadSource("src/features/orders/api/orders.ts", { "@/lib/axiosInstance": { axiosInstance } });
  const query = { page: 2, limit: 10, sortBy: "total_high_low", status: "delivered" };
  const signal = new AbortController().signal;
  assert.deepEqual(await api.fetchSales(query, signal), { sales: [] });
  assert.deepEqual(calls.pop(), ["/orders/sales", { params: query, signal }]);
  for (const status of ["outForDelivery", "received"]) {
    await api.updateOrderDeliveryStatus({ orderId: "parent/order", status, note: "Confirmed" });
    assert.deepEqual(calls.pop(), ["/orders/parent%2Forder/status", { status, note: "Confirmed" }]);
  }
  await assert.rejects(api.updateOrderDeliveryStatus({ orderId: "parent/order", status: "delivered" }), /attach delivery evidence/);
  assert.equal(calls.length, 0);
  for (const [name, type] of [["receipt.png", "image/png"], ["receipt.pdf", "application/pdf"]]) {
    const deliveryImage = new File(["delivery evidence"], name, { type });
    await api.updateOrderDeliveryStatus({ orderId: "parent/order", status: "delivered", note: "Confirmed", deliveryImage });
    const [url, body] = calls.pop();
    assert.equal(url, "/orders/parent%2Forder/status");
    assert.ok(body instanceof FormData);
    assert.equal(body.get("status"), "delivered");
    assert.equal(body.get("note"), "Confirmed");
    assert.equal(body.get("deliveryImage").name, name);
    assert.equal(await body.get("deliveryImage").text(), "delivery evidence");
  }
});

test("tracking modal renders all states with completed/next/future colors and recorded dates only", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const jsx = require("react/jsx-runtime");
  const helpers = loadSource("src/features/orders/helpers/orderDelivery.ts");
  const timeline = loadSource("src/features/orders/components/OrderTrackingTimeline/OrderTrackingTimeline.tsx", {
    "react/jsx-runtime": jsx,
    "../../helpers/orderDelivery": helpers,
  });
  const { default: TrackOrderModal } = loadSource("src/features/orders/components/TrackOrderModal/TrackOrderModal.tsx", {
    "react/jsx-runtime": jsx,
    "@/components/atoms/Button/Button": { default: ({ children }) => React.createElement("button", null, children) },
    "@/components/atoms/ModalWrapper/ModalWrapper": { default: ({ children }) => React.createElement("div", null, children) },
    "../OrderTrackingTimeline/OrderTrackingTimeline": timeline,
  });
  const html = renderToStaticMarkup(React.createElement(TrackOrderModal, {
    open: true, onClose() {}, orderNumber: "123", isLoading: false, onCancel() {},
    tracking: { deliveryStatus: "orderConfirmed", deliveryStatusUpdatedAt: "2026-11-20T10:00:00Z", deliveryDate: "2026-11-25T10:00:00Z", orderSteps: [] },
  }));
  for (const label of Object.values(helpers.deliveryLabels)) assert.ok(html.includes(label), label);
  assert.equal(html.split('aria-label="Completed"').length - 1, 1);
  assert.equal(html.split('aria-label="Next step"').length - 1, 1);
  assert.equal(html.split('aria-label="Not completed"').length - 1, 4);
  assert.equal(html.split("<time").length - 1, 1);
  assert.match(html, /20 November 2026/);
  assert.doesNotMatch(html, /25 November 2026/);
  assert.ok(html.includes("bg-[#25C269]"));
  assert.ok(html.includes("bg-[#FFC107]"));
  assert.ok(html.includes("bg-[#D0D5DD]"));
});

test("sale details select the specific product line and exclude unrelated order items", () => {
  const { getDetailProducts, formatOrderMoney } = loadSource("src/features/orders/helpers/orderDetails.ts");
  const first = { _id: "line-a", productId: "product-a" };
  const other = { _id: "line-b", productId: "product-b" };
  const repeated = { _id: "line-c", productId: "product-a" };
  const order = { products: [first, other, repeated] };
  assert.deepEqual(getDetailProducts(order), [first, other, repeated]);
  assert.deepEqual(getDetailProducts(order, { saleId: "line-c", product: { id: "product-a" } }), [repeated]);
  assert.deepEqual(getDetailProducts(order, { saleId: "missing-line", product: { id: "product-b" } }), [other]);
  assert.deepEqual(getDetailProducts(order, { saleId: "missing-line", product: { id: "missing-product" } }), []);
  assert.equal(formatOrderMoney(undefined), "N/A");
  assert.equal(formatOrderMoney(NaN), "N/A");
  assert.match(formatOrderMoney(0, "NGN"), /0/);
  assert.match(formatOrderMoney(1234, "USD"), /1,234/);
});

test("reference IDs stay out of the rendered details but remain available to copy", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const jsx = require("react/jsx-runtime");
  const icons = require("lucide-react");
  const helpers = loadSource("src/features/orders/helpers/orderDetails.ts");
  const delivery = loadSource("src/features/orders/helpers/orderDelivery.ts");
  const display = loadSource("src/features/orders/helpers/orderDisplay.ts", { "./orderDelivery": delivery });
  const copy = loadSource("src/components/atoms/CopyReferenceButton/CopyReferenceButton.tsx", {
    "react/jsx-runtime": jsx, "lucide-react": icons, sonner: { toast: { success() {}, error() {} } },
  });
  const { default: Panel } = loadSource("src/features/orders/components/OrderReferencePanel/OrderReferencePanel.tsx", {
    "react/jsx-runtime": jsx, "lucide-react": icons,
    "@/components/atoms/CopyReferenceButton/CopyReferenceButton": copy,
    "../../helpers/orderDetails": helpers, "../../helpers/orderDisplay": display,
  });
  const identifiers = ["private-order-reference", "private-cart-reference", "private-line-reference", "private-product-reference", "private-seller-reference"];
  const order = { _id: identifiers[0], cartId: identifiers[1], products: [{ _id: identifiers[2], productId: identifiers[3], merchantId: identifiers[4], productName: "Cement" }] };
  const html = renderToStaticMarkup(React.createElement(Panel, { order }));
  assert.match(html, /<details/);
  assert.doesNotMatch(html, /<details[^>]*\bopen(?:[\s=>])/);
  for (const id of identifiers) assert.ok(!html.includes(id), id);
  for (const label of ["Order ID", "Cart ID", "Product ID", "Seller ID", "Order item ID"]) assert.ok(html.includes(`aria-label="Copy ${label} for `), label);
});
