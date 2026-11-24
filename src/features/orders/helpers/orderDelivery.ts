import type { CustomerOrder, OrderDeliveryStatus, OrderStep, OrderTracking } from "../types/order";

export const deliveryLabels: Record<OrderDeliveryStatus, string> = {
  orderConfirmed: "Order Confirmed", outForDelivery: "Out for Delivery", delivered: "Delivered",
  received: "Received", canceled: "Canceled", returned: "Returned",
};
export const deliveryStatuses: OrderDeliveryStatus[] = ["orderConfirmed", "outForDelivery", "delivered", "received", "canceled", "returned"];
const normalStatuses: OrderDeliveryStatus[] = ["orderConfirmed", "outForDelivery", "delivered", "received"];
export const formatDeliveryDate = (value?: string | null) => {
  if (!value || !Number.isFinite(new Date(value).getTime())) return "";
  return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date(value));
};
export const deliveryTone = (status: OrderDeliveryStatus) => status === "outForDelivery" ? "text-[#FF9933]" : ["delivered", "received"].includes(status) ? "text-[#18A154]" : ["canceled", "returned"].includes(status) ? "text-[#FF5D7A]" : "text-[#474C48]";
export const getOrderActions = (order: Pick<CustomerOrder, "deliveryStatus" | "paymentStatus">) => ({
  canPay: ["unpaid", "failed"].includes(order.paymentStatus) && order.deliveryStatus === "orderConfirmed",
  canCancel: order.deliveryStatus === "orderConfirmed",
  canTrack: true,
  canReceive: order.deliveryStatus === "delivered",
  canReturn: ["delivered", "received"].includes(order.deliveryStatus),
  canReorder: ["delivered", "received"].includes(order.deliveryStatus),
  canReview: order.deliveryStatus === "delivered",
});
export const getSaleActions = (status: OrderDeliveryStatus) => ({
  canCancel: status === "orderConfirmed", canDispatch: status === "orderConfirmed", canDeliver: status === "outForDelivery",
});

// Canceled and returned are alternate outcomes, not mandatory delivery stages.
export const getTrackingSteps = (tracking: OrderTracking) => {
  const history: OrderStep[] = [...(tracking.timeline ?? []), ...(tracking.orderSteps ?? [])];
  const currentIndex = normalStatuses.indexOf(tracking.deliveryStatus);
  const nextStatus = currentIndex >= 0 ? normalStatuses[currentIndex + 1] : undefined;
  return deliveryStatuses.map((status) => {
    const records = history.filter((step) => step.status === status);
    const record = records.at(-1);
    const timestamp = [...records].reverse().map((step) => step.activatedAt || step.timestamp).find(Boolean)
      || (status === tracking.deliveryStatus ? tracking.deliveryStatusUpdatedAt : null)
      || (status === "delivered" ? tracking.deliveredAt : null);
    const index = normalStatuses.indexOf(status);
    const isCompleted = status === tracking.deliveryStatus || Boolean(record?.isCompleted || timestamp) || (currentIndex >= 0 && index >= 0 && index < currentIndex);
    return { status, label: record?.label || deliveryLabels[status], timestamp: isCompleted ? timestamp : null, isCompleted, isNext: !isCompleted && status === nextStatus, note: record?.note };
  });
};
