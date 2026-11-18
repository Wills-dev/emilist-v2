"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import type { FilterState } from "@/lib/hooks/useFilters";
import { useInfiniteScrollTrigger } from "@/lib/hooks/useInfiniteScrollTrigger";
import { fetchAllExperts } from "../api/fetchAllExperts";
import { expertListParams, mapExpertListItem, sortExperts } from "../helpers/expertList";
import { businessKeys } from "../queries/businessKeys";

export const useExpertListing = (filters: FilterState, search?: string | null, limit = 10, savedOnly = false) => {
  const userId = useStore((state) => state.currentUser?._id);
  const params = { ...expertListParams(filters, search), limit, ...(userId ? { userId } : {}) };
  const query = useInfiniteQuery({
    queryKey: [...businessKeys.all, "list", userId, params],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) => fetchAllExperts({ ...params, page: pageParam }, signal),
    getNextPageParam: (last) => last.page < last.totalPages ? last.page + 1 : undefined,
    staleTime: 60_000, retry: 1,
  });
  const unique = new Map(query.data?.pages.flatMap((page) => page.businesses).map((business) => [business._id, business]));
  const experts = sortExperts([...unique.values()].map(mapExpertListItem).filter((expert) => !savedOnly || expert.isLiked), filters.sortBy);
  const loadMore = () => { if (query.hasNextPage && !query.isFetching) void query.fetchNextPage(); };
  const sentinelRef = useInfiniteScrollTrigger({ onIntersect: loadMore, enabled: Boolean(query.hasNextPage) && !query.isFetching, threshold: 0.25 });
  const retry = () => { void query.refetch(); };
  return { experts, businesses: [...unique.values()], query, sentinelRef, retry, loadMore };
};
