"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchApplicationById } from "../api/fetchApplicationById";
import { jobKeys } from "../queries/jobKeys";

export const useApplicationDetails = (applicationId: string, jobId: string, { enabled = true, refetchInterval = false }: { enabled?: boolean; refetchInterval?: number | false } = {}) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: [...jobKeys.all, "application", userId, jobId, applicationId],
    queryFn: ({ signal }) => fetchApplicationById(applicationId, jobId, signal),
    enabled: enabled && Boolean(userId && applicationId && jobId),
    staleTime: 15 * 1000,
    refetchInterval,
    retry: 1,
  });
};
