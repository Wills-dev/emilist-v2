import { useInfiniteQuery } from "@tanstack/react-query";
import { getLikedMaterials } from "../api";
import { useFilters } from "@/lib/hooks/useFilters";

export const useGetSavedMaterials = ({
  limit = 10,
}: { limit?: number } = {}) => {
  const filterControls = useFilters();
  const {
    filters,
    status,
    submittedQuery,
  } = filterControls;
  const {
    brand,
    categories,
    deliveryTime,
    location,
    maxPrice,
    minPrice,
    rating,
    sortBy,
    sortOrder,
  } = filters;

  const query = useInfiniteQuery({
    queryKey: [
      "saved-materials",
      submittedQuery,
      limit,
      status,
      categories.join(","),
      brand,
      minPrice,
      maxPrice,
      location,
      rating,
      deliveryTime,
      sortBy,
      sortOrder,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getLikedMaterials({
        page: pageParam,
        limit,
        search: submittedQuery,
        category: categories.join(","),
        brand,
        minPrice,
        maxPrice,
        location,
        rating,
        deliveryTime,
        status,
        sortBy,
        sortOrder,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNext && lastPage.meta.nextPage !== null
        ? lastPage.meta.nextPage
        : undefined,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    ...filterControls,
    ...query,
    materials: query.data?.pages.flatMap((page) => page.data) ?? [],
  };
};
