import type { UserSubscription } from "../types";

const object = (value: unknown): Record<string, unknown> => value && typeof value === "object" ? value as Record<string, unknown> : {};
const text = (value: unknown) => typeof value === "string" ? value : "";
const unwrap = (response: unknown) => Object.hasOwn(object(response), "data") ? object(response).data : response;

export const normalizeUserSubscription = (value: unknown): UserSubscription => {
  const item = object(value);
  const plan = object(item.plan ?? item.planId ?? item.subscriptionPlan);
  const id = text(item._id) || text(item.id) || text(item.subscriptionId);
  if (!id) throw new Error("The subscription response is missing its ID.");
  const rawAmount = item.amount ?? item.price;
  const amount = (typeof rawAmount === "number" || typeof rawAmount === "string") && String(rawAmount).trim() ? Number(String(rawAmount).replaceAll(",", "")) : undefined;
  return {
    id,
    planId: text(item.planId) || text(plan._id) || text(plan.id),
    planName: text(item.planName) || text(plan.name) || text(item.name),
    status: text(item.status) || (typeof item.isActive === "boolean" ? item.isActive ? "active" : "inactive" : "unknown"),
    startedAt: text(item.startDate) || text(item.startedAt),
    expiresAt: text(item.endDate) || text(item.expiresAt),
    createdAt: text(item.createdAt),
    paidAt: text(item.paidAt) || text(item.datePaid),
    amount: amount !== undefined && Number.isFinite(amount) && amount >= 0 ? amount : undefined,
    currency: text(item.currency) || text(plan.currency) || "NGN",
    reference: text(item.reference) || id,
    paymentStatus: text(item.paymentStatus),
  };
};

export const normalizeCurrentSubscription = (response: unknown): UserSubscription | null => {
  const data = unwrap(response);
  if (data === null || data === undefined || Object.keys(object(data)).length === 0) return null;
  const value = Object.hasOwn(object(data), "subscription") ? object(data).subscription : data;
  return value ? normalizeUserSubscription(value) : null;
};

export const normalizeSubscriptionHistory = (response: unknown): UserSubscription[] => {
  const data = unwrap(response);
  const items = Array.isArray(data) ? data : object(data).subscriptions;
  if (!Array.isArray(items)) throw new Error("The subscription history response did not include a valid list.");
  return [...new Map(items.map((item) => { const subscription = normalizeUserSubscription(item); return [subscription.id, subscription] as const; })).values()];
};
