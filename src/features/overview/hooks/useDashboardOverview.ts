"use client";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchDashboardOverview } from "../api";
import type { DashboardPeriod } from "../types/api";

export const useDashboardOverview = (period: DashboardPeriod) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: ["dashboard-overview", userId, period],
    queryFn: ({ signal }) => fetchDashboardOverview(period, signal),
    enabled: Boolean(userId),
    placeholderData: (previous, query) => query?.queryKey[1] === userId ? previous : undefined,
    retry: 1,
  });
};
