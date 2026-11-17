import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInbox, fetchMessages } from "../api/messaging";
import { messageKeys } from "../queries/messageKeys";
import type { Pagination } from "../types/messaging";

const nextPage = (page: Pagination) => page.currentPage < page.totalPages ? page.currentPage + 1 : undefined;
export const useInbox = (userId: string, search: string, enabled: boolean) => useInfiniteQuery({
  queryKey: messageKeys.inbox(userId, search),
  queryFn: ({ pageParam, signal }) => fetchInbox(pageParam, search, signal),
  initialPageParam: 1, getNextPageParam: nextPage,
  enabled, retry: 1, staleTime: 15_000,
});
export const useMessageHistory = (userId: string, otherUserId: string, enabled: boolean) => useInfiniteQuery({
  queryKey: messageKeys.history(userId, otherUserId),
  queryFn: ({ pageParam, signal }) => fetchMessages(otherUserId, pageParam, signal),
  initialPageParam: 1, getNextPageParam: nextPage,
  enabled: enabled && Boolean(otherUserId), retry: 1, staleTime: 15_000,
});
