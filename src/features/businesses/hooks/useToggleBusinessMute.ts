"use client";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { toggleBusinessMute } from "../api/toggleBusinessMute";
import { businessKeys } from "../queries/businessKeys";

export const useToggleBusinessMute = (businessId: string, initialMuted = false) => {
  const userId = useStore((state) => state.currentUser?._id);
  const client = useQueryClient();
  const pending = useRef(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const key = ["business-mute-state", userId, businessId];
  const state = useQuery({ queryKey: key, queryFn: () => initialMuted, initialData: initialMuted, enabled: false });
  const mutation = useMutation({
    mutationFn: () => toggleBusinessMute(businessId),
    onSuccess: async (response) => {
      const muted = response.data?.isMuted ?? response.data?.muted ?? !state.data;
      client.setQueryData(key, muted);
      setConfirmOpen(false);
      toast.success(muted ? "Expert flagged. Their business will be hidden from your marketplace." : "Expert unflagged.");
      await client.invalidateQueries({ queryKey: businessKeys.all });
    },
    onError: promiseErrorFunction,
    onSettled: () => { pending.current = false; },
  });
  const requestToggle = () => {
    if (!userId) {
      useStore.getState().setPendingFlow(null, {}, window.location.pathname + window.location.search, true);
      return;
    }
    if (!businessId || pending.current) return;
    setConfirmOpen(true);
  };
  const changeConfirmOpen = (open: boolean) => { if (!pending.current) setConfirmOpen(open); };
  const confirmToggle = () => {
    if (!confirmOpen || !userId || !businessId || pending.current) return;
    pending.current = true;
    mutation.mutate();
  };
  return { muted: state.data, busy: mutation.isPending, confirmOpen, requestToggle, changeConfirmOpen, confirmToggle };
};
