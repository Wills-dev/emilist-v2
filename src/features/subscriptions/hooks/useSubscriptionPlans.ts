"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchSubscriptionPlans } from "../api/fetchSubscriptionPlans";
import { subscriptionKeys } from "../queries/subscriptionKeys";

export const useSubscriptionPlans = (duration: "monthly" | "yearly" = "monthly", enabled = true) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: subscriptionKeys.plans(userId, duration),
    queryFn: ({ signal }) => fetchSubscriptionPlans(duration, signal),
    enabled: enabled && Boolean(userId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
