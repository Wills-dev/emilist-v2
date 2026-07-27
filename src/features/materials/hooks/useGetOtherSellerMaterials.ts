import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getOtherProductsByUser } from "../api";

export const useGetOtherSellerMaterials = ({
  sellerId,
  page = 1,
  limit = 2,
}: {
  sellerId?: string;
  page?: number;
  limit?: number;
}) =>
  useQuery({
    queryKey: ["other seller materials", sellerId, page, limit],
    queryFn: () =>
      getOtherProductsByUser({
        userId: sellerId as string,
        page,
        limit,
      }),
    enabled: Boolean(sellerId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
