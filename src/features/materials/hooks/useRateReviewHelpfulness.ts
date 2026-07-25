import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { rateReviewHelpfulness } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";

export const useRateReviewHelpfulness = (reviewId: string) => {
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (isHelpful: boolean) =>
      rateReviewHelpfulness({ reviewId, isHelpful }),
    onSuccess: (_data, isHelpful) => {
      toast.success(
        isHelpful
          ? "Marked as helpful."
          : "Marked as not helpful.",
      );
      queryClient.invalidateQueries({ queryKey: ["material reviews"] });
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const rateHelpfulness = (isHelpful: boolean) => {
    if (!reviewId || isPending) return;

    if (!currentUser) {
      setIsModalFlow(true);
      openModal("login");
      return;
    }

    mutate(isHelpful);
  };

  return {
    rateHelpfulness,
    isPending,
    pendingValue: isPending ? variables : undefined,
  };
};
