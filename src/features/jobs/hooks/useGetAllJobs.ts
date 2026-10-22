import { useInfiniteQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";

import { fetchAllJobs } from "../api/fetchAllJobs";
import { jobKeys } from "../queries/jobKeys";
import type { FetchAllJobsListQuery } from "../types/listJobs";

export const useGetAllJobs = ({
  query,
  enabled = true,
}: {
  query: FetchAllJobsListQuery;
  enabled?: boolean;
}) => {
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);

  return useInfiniteQuery({
    queryKey: jobKeys.list(query),
    queryFn: ({ pageParam, signal }) =>
      fetchAllJobs({ ...query, page: Number(pageParam) }, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
    // Wait for the viewer ID to settle before starting a personalized query.
    enabled: enabled && isAuthInitialized,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
