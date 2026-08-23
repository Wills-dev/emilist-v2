import { useQuery } from "@tanstack/react-query";

import { fetchJobById } from "../api/fetchJobById";
import { mapJobDetails } from "../helpers/jobDetails";
import { jobKeys } from "../queries/jobKeys";

export const useGetJobById = (
  jobId: string,
  { reviewsPage = 1, reviewsLimit = 5 } = {},
) =>
  useQuery({
    queryKey: [...jobKeys.detail(jobId), { reviewsPage, reviewsLimit }],
    queryFn: ({ signal }) =>
      fetchJobById({ id: jobId, reviewsPage, reviewsLimit }, signal),
    select: mapJobDetails,
    enabled: Boolean(jobId.trim()),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
