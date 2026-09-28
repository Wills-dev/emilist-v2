import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchJobsByStatus } from "../api/fetchJobsByStatus";
import { jobKeys } from "../queries/jobKeys";
import type {
  JobStatusFilter,
  JobsByStatusListQuery,
} from "../types/manageJobs";

export const useGetJobsByStatus = ({
  status,
  query,
  page = 1,
  enabled = true,
}: {
  status: JobStatusFilter;
  query: JobsByStatusListQuery;
  page?: number;
  enabled?: boolean;
}) => {
  const fullQuery = { ...query, status, page };

  return useQuery({
    queryKey: jobKeys.byStatus(fullQuery),
    queryFn: ({ signal }) => fetchJobsByStatus(fullQuery, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
