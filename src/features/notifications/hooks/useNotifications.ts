"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchNotifications } from "../api/fetchNotifications";
import { notificationKeys } from "../queries/notificationKeys";

export const useNotifications = (page: number, limit: number, enabled: boolean) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: notificationKeys.list(userId, page, limit),
    queryFn: ({ signal }) => fetchNotifications(page, limit, signal),
    enabled: enabled && Boolean(userId),
    staleTime: 0,
    retry: 1,
  });
};
