import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchListedJobs } from "../api/fetchListedJobs";
import { jobKeys } from "../queries/jobKeys";
import type { ListedJobsListQuery } from "../types/manageJobs";

export const useGetListedJobs = ({
  query,
  page = 1,
  enabled = true,
}: {
  query: ListedJobsListQuery;
  page?: number;
  enabled?: boolean;
}) => {
  const fullQuery = { ...query, page };

  return useQuery({
    queryKey: jobKeys.listed(fullQuery),
    queryFn: ({ signal }) => fetchListedJobs(fullQuery, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
