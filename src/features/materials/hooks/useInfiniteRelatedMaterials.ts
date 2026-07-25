import { useInfiniteQuery } from "@tanstack/react-query";

import { getOtherProductsByUser, getSimilarProducts } from "../api";
import { useStore } from "@/store/authStore";

export const useInfiniteSellerMaterials = (sellerId?: string, limit = 10) =>
  useInfiniteQuery({
    queryKey: ["all seller materials", sellerId, limit],
    queryFn: ({ pageParam = 1 }) =>
      getOtherProductsByUser({
        userId: sellerId as string,
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const page = Number(lastPage.currentPage);
      return page < lastPage.totalPages ? page + 1 : undefined;
    },
    enabled: Boolean(sellerId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

export const useInfiniteSimilarMaterials = (productId?: string, limit = 10) => {
  const currentUserId = useStore((state) => state.currentUser?._id);

  return useInfiniteQuery({
    queryKey: [
      "all similar materials",
      productId,
      limit,
      currentUserId,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getSimilarProducts({
        productId: productId as string,
        page: pageParam,
        limit,
        userId: currentUserId,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.similarProducts.length === limit
        ? pages.length + 1
        : undefined,
    enabled: Boolean(productId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
