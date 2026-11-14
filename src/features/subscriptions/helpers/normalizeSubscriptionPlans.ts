import type { SubscriptionPlan } from "@/features/settings/types/subscription";

const record = (value: unknown): Record<string, unknown> => value && typeof value === "object" ? value as Record<string, unknown> : {};
const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
const price = (value: unknown) => {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value !== "number" && typeof value !== "string") return undefined;
  if (typeof value === "string" && !value.trim()) return undefined;
  const amount = Number(typeof value === "string" ? value.replaceAll(",", "") : value);
  return Number.isFinite(amount) && amount >= 0 ? amount : undefined;
};

export const normalizeSubscriptionPlans = (response: unknown, duration: "monthly" | "yearly" = "monthly"): SubscriptionPlan[] => {
  const data = record(response).data ?? response;
  const items = Array.isArray(data) ? data : record(data).plans;
  if (!Array.isArray(items)) throw new Error("The plans response did not include a valid plans list.");
  const plans = items.map((value): SubscriptionPlan => {
    const item = record(value);
    const id = text(item._id) || text(item.id) || text(item.planId);
    const name = text(item.name) || text(item.planName);
    if (!id || !name) throw new Error("A subscription plan is missing its ID or name.");
    const billingPeriod = item.billingPeriod === "yearly" || item.billingPeriod === "monthly" ? item.billingPeriod : duration;
    const features = Array.isArray(item.offers)
      ? item.offers.map(record).filter((offer) => offer.isActive !== false).map((offer) => text(offer.name)).filter(Boolean)
      : Array.isArray(item.features) ? item.features.filter((feature): feature is string => typeof feature === "string").map((feature) => feature.trim()).filter(Boolean) : [];
    return {
      id,
      name,
      monthlyPrice: price(item.monthlyPrice) ?? (billingPeriod === "monthly" ? price(item.price) : undefined),
      yearlyPrice: price(item.yearlyPrice) ?? (billingPeriod === "yearly" ? price(item.price) : undefined),
      currency: text(item.currency) || "NGN",
      description: text(item.description),
      features: [...new Set(features)],
      color: "#25C269",
      // Plan availability does not establish the user's current subscription.
    };
  });
  return [...new Map(plans.map((plan) => [plan.id, plan])).values()];
};
