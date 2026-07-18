import { useQuery } from "@tanstack/react-query";
import { getMaterialInfo } from "../api";
import { ProductReviewResponse } from "../types";

export const useGetMaterialInfo = (materialId: string) => {
  const { data, isLoading } = useQuery<ProductReviewResponse>({
    queryKey: ["material info", materialId],
    queryFn: () => getMaterialInfo(materialId),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data,
    isLoading,
  };
};
