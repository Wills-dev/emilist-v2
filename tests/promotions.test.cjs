/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const React = require("react");
const jsx = require("react/jsx-runtime");
const { renderToStaticMarkup } = require("react-dom/server");
const load = require("./helpers/loadSource.cjs");
const helpers = load("src/features/promotions/helpers/promotion.ts");

test("promotion plans match the design and reject unsupported durations or types", () => {
  assert.deepEqual(helpers.promotionPlans.map((plan) => [plan.duration, plan.price]), [[7,1750],[14,3500],[21,5250],[30,7500],[45,11250],[60,15000],[90,22500],[120,30000]]);
  for (const duration of [0, 1, 8, 365, NaN]) assert.throws(() => helpers.validatePromotion("id", "job", duration));
  assert.throws(() => helpers.validatePromotion("", "job", 7));
  assert.throws(() => helpers.validatePromotion("id", "expert", 7));
  for (const type of ["job", "business", "material"]) helpers.validatePromotion("id", type, 7);
});

test("campaign creation posts the resource ID, type and duration without guessed payment fields", async () => {
  const calls = [];
  const api = load("src/features/promotions/api/createPromotion.ts", {
    "../helpers/promotion": helpers,
    "@/lib/axiosInstance": { axiosInstance: { post: async (...args) => { calls.push(args); return { data: { message: "success", data: { status: "success" } } }; } } },
  });
  for (const type of ["job", "business", "material"]) {
    await api.createPromotion({ id: "resource/id", type, duration: 14 });
    assert.deepEqual(calls.pop(), ["/subscription/promote/resource%2Fid", { type, duration: 14 }]);
  }
  await assert.rejects(api.createPromotion({ id: "id", type: "job", duration: 8 }));
  assert.equal(calls.length, 0);
});

test("promotion actions are hidden from visitors and nonowners for every resource type", () => {
  for (const type of ["job", "business", "material"]) {
    for (const [userId, ownerId, visible] of [[undefined,"owner",false],["other","owner",false],["owner",undefined,false],["owner","owner",true]]) {
      const action = load("src/features/promotions/components/PromotionAction/PromotionAction.tsx", {
        react: React, "react/jsx-runtime": jsx,
        "@/store/authStore": { useStore: (selector) => selector({ currentUser: userId ? { _id: userId } : null }) },
        "@/components/atoms/PromoteBtn/PromoteBtn": { default: () => React.createElement("button", null, "Promote") },
        "../../helpers/promotion": helpers,
        "../PromoteListingModal/PromoteListingModal": { default: () => null },
      }).default;
      const html = renderToStaticMarkup(React.createElement(action, { id: "resource", type, ownerId }));
      assert.equal(html.includes("Promote"), visible);
    }
  }
});

test("shared modal renders contextual copy, eight plans, default selection and campaign action", () => {
  const modal = load("src/features/promotions/components/PromoteListingModal/PromoteListingModal.tsx", {
    react: React, "react/jsx-runtime": jsx,
    "@/store/authStore": { useStore: (selector) => selector({ currentUser: { _id: "owner" } }) },
    "@/components/atoms/Button/Button": { default: ({ children, type, disabled }) => React.createElement("button", { type, disabled }, children) },
    "@/components/atoms/ModalWrapper/ModalWrapper": { default: ({ children, title }) => React.createElement("section", null, React.createElement("h1", null, title), children) },
    "../../helpers/promotion": helpers,
    "../../hooks/useCreatePromotion": { useCreatePromotion: () => ({ isPending: false }) },
  }).default;
  for (const type of ["job", "business", "material"]) {
    const html = renderToStaticMarkup(React.createElement(modal, { id: "resource", type, ownerId: "owner", onClose() {} }));
    assert.ok(html.includes(helpers.promotionCopy[type].title));
    assert.ok(html.includes(helpers.promotionCopy[type].description));
    assert.equal((html.match(/type="radio"/g) ?? []).length, 8);
    assert.match(html, /checked="" value="7"/);
    assert.ok(html.includes("₦1,750"));
    assert.ok(html.includes("Create Campaign"));
  }
});
