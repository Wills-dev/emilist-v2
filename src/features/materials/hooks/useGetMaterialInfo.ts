import { useQuery } from "@tanstack/react-query";
import { getMaterialInfo } from "../api";
import { ProductReviewResponse } from "../types";
import { useStore } from "@/store/authStore";

export const useGetMaterialInfo = (materialId: string) => {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const { data, isLoading } = useQuery<ProductReviewResponse>({
    queryKey: ["material info", materialId, currentUserId],
    queryFn: () => getMaterialInfo(materialId, currentUserId),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data,
    isLoading,
  };
};
