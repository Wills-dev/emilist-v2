import { useMemo } from "react";

import { useFilters } from "@/lib/hooks/useFilters";
import { useStore } from "@/store/authStore";
import { buildJobsMarketplaceQuery, mapJobListItem } from "../helpers/jobList";
import { useGetAllJobs } from "./useGetAllJobs";

export const useJobsMarketplace = ({
  limit = 10,
  enabled = true,
}: {
  limit?: number;
  enabled?: boolean;
} = {}) => {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const filterController = useFilters();
  const { filters, submittedQuery } = filterController;

  const requestQuery = useMemo(
    () =>
      buildJobsMarketplaceQuery({
        filters,
        search: submittedQuery,
        viewerId: currentUserId,
        limit,
      }),
    [currentUserId, filters, limit, submittedQuery],
  );

  const query = useGetAllJobs({ query: requestQuery, enabled });
  const jobs = useMemo(() => {
    const mappedJobs =
      query.data?.pages.flatMap((page) => page.jobs.map(mapJobListItem)) ?? [];
    const seen = new Set<string>();

    return mappedJobs.filter((job) => {
      if (!job.id || seen.has(job.id)) return false;
      seen.add(job.id);
      return true;
    });
  }, [query.data]);

  return {
    ...filterController,
    jobs,
    query,
  };
};
