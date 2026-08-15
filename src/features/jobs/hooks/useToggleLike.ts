import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleLike } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { jobKeys } from "../queries/jobKeys";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const { mutate, isPending } = useMutation({
    mutationFn: toggleLike,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: jobKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["job info", variables.jobId],
      });
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleToggleLike = (jobId: string) => {
    if (!currentUser) {
      setIsModalFlow(true);
      openModal("login");
      return;
    }

    if (isPending) return;

    mutate({ jobId });
  };

  return {
    handleToggleLike,
    isUpdating: isPending,
  };
};
