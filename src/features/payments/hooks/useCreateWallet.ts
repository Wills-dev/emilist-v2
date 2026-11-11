"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { createWallet } from "../api/createWallet";
import { walletKeys } from "../queries/walletKeys";

export const useCreateWallet = (onSuccess: (currency: string) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWallet,
    retry: false,
    onSuccess: async (_response, payload) => {
      await queryClient.invalidateQueries({ queryKey: walletKeys.all });
      toast.success(`${payload.currency} wallet created.`);
      onSuccess(payload.currency);
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to create wallet.");
    },
  });
};
