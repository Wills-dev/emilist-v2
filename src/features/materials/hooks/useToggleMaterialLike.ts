import { useMutation, useQueryClient } from "@tanstack/react-query";

import { likeMaterial, unlikeMaterial } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { ProductReviewResponse } from "../types";

export const useToggleMaterialLike = ({
  materialId,
  initialIsLiked,
}: {
  materialId: string;
  initialIsLiked: boolean;
}) => {
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const { mutate, isPending } = useMutation({
    mutationFn: (shouldLike: boolean) =>
      shouldLike ? likeMaterial(materialId) : unlikeMaterial(materialId),
    onMutate: async (shouldLike) => {
      const queryKey = ["material info", materialId];

      await queryClient.cancelQueries({ queryKey });
      const previousMaterialInfo =
        queryClient.getQueriesData<ProductReviewResponse>({ queryKey });

      queryClient.setQueriesData<ProductReviewResponse>({ queryKey }, (data) =>
        data
          ? {
              ...data,
              product: { ...data.product, isLiked: shouldLike },
            }
          : data,
      );

      return { previousMaterialInfo };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      queryClient.invalidateQueries({
        queryKey: ["material info", materialId],
      });
    },
    onError: (error: ApiErrorResponse, _shouldLike, context) => {
      context?.previousMaterialInfo.forEach(([queryKey, data]) => {
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

    mutate(!initialIsLiked);
  };

  return { isLiked: initialIsLiked, handleToggleLike, isUpdating: isPending };
};
