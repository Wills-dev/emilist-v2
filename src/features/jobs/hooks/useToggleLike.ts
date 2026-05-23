import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleLike } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: toggleLike,
    onSuccess: (data, Variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["job info", Variables?.jobId],
      });
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error toggling like", error);
      promiseErrorFunction(error);
    },
  });

  const handleToggleLike = (jobId: string) => {
    mutate({ jobId });
  };

  return {
    handleToggleLike,
    isUpdating: isPending,
  };
};
