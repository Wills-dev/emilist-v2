"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchJobAnalytics } from "../api/fetchJobAnalytics";
import { jobKeys } from "../queries/jobKeys";
import type { JobAnalyticsQuery } from "../types/jobAnalytics";

export const useJobAnalytics = (query: JobAnalyticsQuery = {}) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: jobKeys.analytics(query, userId),
    queryFn: ({ signal }) => fetchJobAnalytics(query, signal),
    enabled: Boolean(userId),
    staleTime: 60_000,
    retry: 1,
  });
};
