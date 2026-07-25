import { useQuery } from "@tanstack/react-query";

import { getSimilarProducts } from "../api";
import { useStore } from "@/store/authStore";

export const useGetSimilarMaterials = ({
  productId,
  limit = 4,
}: {
  productId: string;
  limit?: number;
}) => {
  const currentUserId = useStore((state) => state.currentUser?._id);

  return useQuery({
    queryKey: ["similar materials", productId, limit, currentUserId],
    queryFn: () =>
      getSimilarProducts({
        productId,
        page: 1,
        limit,
        userId: currentUserId,
      }),
    enabled: Boolean(productId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
