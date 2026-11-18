"use client";

import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { deleteBusiness } from "@/features/businesses/api/deleteBusiness";
import { businessKeys } from "@/features/businesses/queries/businessKeys";

export const useDeleteBusiness = (businessId: string) => {
  const [open, setOpen] = useState(false);
  const pending = useRef(false);
  const queryClient = useQueryClient();
  const userId = useStore((state) => state.currentUser?._id);
  const mutation = useMutation({
    mutationFn: deleteBusiness,
    onSuccess: async () => {
      setOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user-businesses", userId] }),
        queryClient.invalidateQueries({ queryKey: businessKeys.all }),
      ]);
      toast.success("Business deleted successfully.");
    },
    onError: promiseErrorFunction,
    onSettled: () => { pending.current = false; },
  });
  const requestDelete = () => setOpen(true);
  const changeOpen = (value: boolean) => { if (!pending.current) setOpen(value); };
  const confirmDelete = () => {
    if (pending.current || !businessId) return;
    pending.current = true;
    mutation.mutate(businessId);
  };
  return { open, requestDelete, changeOpen, confirmDelete, busy: mutation.isPending };
};
