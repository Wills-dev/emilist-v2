import { useQuery } from "@tanstack/react-query";

import { fetchLikedJobs } from "../api/fetchLikedJobs";
import { jobKeys } from "../queries/jobKeys";

export const useGetLikedJobs = (enabled = true) =>
  useQuery({
    queryKey: jobKeys.liked(),
    queryFn: ({ signal }) => fetchLikedJobs(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
