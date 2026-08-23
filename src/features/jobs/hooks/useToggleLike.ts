import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { likeJob, unlikeJob } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { jobKeys } from "../queries/jobKeys";
import type { JobDetailsDto } from "../types/jobDetails";
import type { FetchAllJobsPage } from "../types/listJobs";

export const useToggleLike = ({
  jobId,
  initialIsLiked,
}: {
  jobId: string;
  initialIsLiked: boolean;
}) => {
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (shouldLike: boolean) =>
      shouldLike ? likeJob(jobId) : unlikeJob(jobId),
    onMutate: async (shouldLike) => {
      await queryClient.cancelQueries({ queryKey: jobKeys.all });

      const previousJobQueries = queryClient.getQueriesData({
        queryKey: jobKeys.all,
      });

      queryClient.setQueriesData<JobDetailsDto>(
        { queryKey: jobKeys.detail(jobId) },
        (job) => (job ? { ...job, liked: shouldLike } : job),
      );
      queryClient.setQueriesData<InfiniteData<FetchAllJobsPage>>(
        { queryKey: jobKeys.lists() },
        (data) =>
          data
            ? {
                ...data,
                pages: data.pages.map((page) => ({
                  ...page,
                  jobs: page.jobs.map((job) =>
                    job._id === jobId ? { ...job, liked: shouldLike } : job,
                  ),
                })),
              }
            : data,
      );

      return { previousJobQueries };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
    onError: (error: ApiErrorResponse, _shouldLike, context) => {
      context?.previousJobQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      promiseErrorFunction(error);
    },
  });

  const handleToggleLike = () => {
    if (!currentUser) {
      setIsModalFlow(true);
      openModal("login");
      return;
    }

    if (isPending) return;

    mutate(!initialIsLiked);
  };

  return {
    handleToggleLike,
    isLiked: isPending ? Boolean(variables) : initialIsLiked,
    isUpdating: isPending,
  };
};
