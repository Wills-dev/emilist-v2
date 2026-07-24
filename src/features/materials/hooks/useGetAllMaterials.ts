import { useInfiniteQuery } from "@tanstack/react-query";
import { getMaterial } from "../api";
import { useFilters } from "@/lib/hooks/useFilters";
import { useStore } from "@/store/authStore";

export const useGetAllMaterials = ({ limit = 20 }: { limit?: number } = {}) => {
  const currentUser = useStore((state) => state.currentUser);
  const currentUserId = currentUser?._id;
  const {
    tab,
    setTab,
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
      location,
      rating,
      deliveryTime,
      sortBy,
      sortOrder,
      currentUserId,
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
        location,
        rating,
        deliveryTime,
        status,
        sortBy,
        sortOrder,
        userId: currentUserId,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNext && lastPage.meta.nextPage !== null
        ? lastPage.meta.nextPage
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const materials = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    tab,
    setTab,
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
