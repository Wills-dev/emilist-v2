import { useInfiniteQuery } from "@tanstack/react-query";
import { getMaterial } from "../api";
import { useFilters } from "@/lib/hooks/useFilters";

export const useGetAllMaterials = ({ limit = 20 }: { limit?: number } = {}) => {
  const {
    filters,
    setFilter,
    clearFilter,
    resetFilters,
    hasFilters,
    setPriceRange,
    toggleCategory,
    isCategorySelected,
    handleSearch,
    handleClear,
    handleSearchChange,
    status,
    setStatus,
    submittedQuery,
  } = useFilters();

  const { brand, categories, minPrice, maxPrice, sortBy, sortOrder } = filters;

  const {
    data,
    isPending,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "materials",
      submittedQuery,
      limit,
      status,
      categories.join(","),
      brand,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getMaterial({
        page: pageParam,
        limit,
        search: submittedQuery,
        category: categories.join(","),
        brand: brand,
        minPrice,
        maxPrice,
        status,
        sortBy,
        sortOrder,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.nextPage : undefined;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  console.log("data", data);

  const materials = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    materials,
    isPending,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setFilter,
    clearFilter,
    resetFilters,
    hasFilters,
    setPriceRange,
    toggleCategory,
    isCategorySelected,
    handleSearch,
    handleClear,
    handleSearchChange,
    status,
    setStatus,
    filters,
  };
};
