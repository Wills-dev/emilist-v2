"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { archiveMaterial } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useArchiveMaterial = (onArchived?: () => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: archiveMaterial,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["other seller materials"],
      });
      toast.success("Listing archived successfully.");
      onArchived?.();
    },
    onError: (error: ApiErrorResponse) => promiseErrorFunction(error),
  });

  return {
    archiveMaterial: mutation.mutate,
    isArchiving: mutation.isPending,
  };
};
