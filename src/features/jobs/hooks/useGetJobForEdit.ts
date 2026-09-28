import { useQuery } from "@tanstack/react-query";

import { fetchJobById } from "../api/fetchJobById";
import { jobKeys } from "../queries/jobKeys";

/**
 * Same cache entry as useGetJobById, but without its `select: mapJobDetails`
 * transform — editing needs the raw DTO (file ids, unformatted budget/milestone
 * fields) that the display view model strips out.
 */
export const useGetJobForEdit = (
  jobId: string,
  { reviewsPage = 1, reviewsLimit = 5 } = {},
) =>
  useQuery({
    queryKey: [...jobKeys.detail(jobId), { reviewsPage, reviewsLimit }],
    queryFn: ({ signal }) =>
      fetchJobById({ id: jobId, reviewsPage, reviewsLimit }, signal),
    enabled: Boolean(jobId.trim()),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
