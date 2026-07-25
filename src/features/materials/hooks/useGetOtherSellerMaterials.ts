import { useQuery } from "@tanstack/react-query";

import { getOtherProductsByUser } from "../api";

export const useGetOtherSellerMaterials = ({
  sellerId,
  limit = 2,
}: {
  sellerId?: string;
  limit?: number;
}) =>
  useQuery({
    queryKey: ["other seller materials", sellerId, limit],
    queryFn: () =>
      getOtherProductsByUser({
        userId: sellerId as string,
        page: 1,
        limit,
      }),
    enabled: Boolean(sellerId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
