"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { markNotificationAsRead } from "../api/markNotificationAsRead";
import { clearNotification } from "../api/clearNotification";
import { notificationKeys } from "../queries/notificationKeys";

export const useNotificationActions = () => {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: notificationKeys.all });
  const markRead = useMutation({
    mutationFn: markNotificationAsRead,
    retry: false,
    onSuccess: refresh,
    onError: promiseErrorFunction,
  });
  const remove = useMutation({
    mutationFn: clearNotification,
    retry: false,
    onSuccess: async () => { await refresh(); toast.success("Notification deleted."); },
    onError: promiseErrorFunction,
  });
  return { markRead, remove, isPending: markRead.isPending || remove.isPending };
};
