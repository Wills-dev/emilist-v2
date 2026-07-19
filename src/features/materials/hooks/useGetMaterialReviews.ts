import { useQuery } from "@tanstack/react-query";

import { getMaterialReviews } from "../api";
import { usePagination } from "@/lib/hooks/usePagination";

export const useGetMaterialReviews = ({
  materialId,
  limit = 10,
  sortBy = "mostRelevant",
}: {
  materialId: string;
  limit?: number;
  sortBy?: string;
}) => {
  const pagination = usePagination();

  const reviewsQuery = useQuery({
    queryKey: ["material reviews", materialId, limit, sortBy, pagination.currentPage],
    queryFn: () =>
      getMaterialReviews({
        materialId,
        page: pagination.currentPage,
        limit,
        sortBy,
      }),
    enabled: Boolean(materialId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    ...reviewsQuery,
    ...pagination,
  };
};
