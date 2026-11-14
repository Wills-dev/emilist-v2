"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchCurrentSubscription, fetchUserSubscriptions } from "../api/fetchUserSubscriptions";
import { subscriptionKeys } from "../queries/subscriptionKeys";

export const useCurrentSubscription = (enabled = true) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({ queryKey: [...subscriptionKeys.all, "current", userId], queryFn: ({ signal }) => fetchCurrentSubscription(signal), enabled: enabled && Boolean(userId), staleTime: 0, retry: 1 });
};

export const useSubscriptionHistory = () => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({ queryKey: [...subscriptionKeys.all, "history", userId], queryFn: ({ signal }) => fetchUserSubscriptions(signal), enabled: Boolean(userId), staleTime: 0, retry: 1 });
};
