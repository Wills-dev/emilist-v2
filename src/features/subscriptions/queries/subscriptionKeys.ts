export const subscriptionKeys = {
  all: ["subscriptions"] as const,
  plans: (userId: string | undefined, duration: "monthly" | "yearly" = "monthly") => [...subscriptionKeys.all, "plans", userId, duration] as const,
};
