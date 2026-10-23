import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";

import { fetchJobById } from "../api/fetchJobById";
import { mapJobDetails } from "../helpers/jobDetails";
import { jobKeys } from "../queries/jobKeys";

export const useGetJobById = (
  jobId: string,
  { reviewsPage = 1, reviewsLimit = 5 } = {},
) => {
  const userId = useStore((state) => state.currentUser?._id);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  return useQuery({
    queryKey: [...jobKeys.detail(jobId), { reviewsPage, reviewsLimit, userId }],
    queryFn: ({ signal }) =>
      fetchJobById({ id: jobId, reviewsPage, reviewsLimit }, signal),
    select: mapJobDetails,
    enabled: isAuthInitialized && Boolean(jobId.trim()),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
