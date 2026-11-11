"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { setDefaultWallet } from "../api/setDefaultWallet";
import { walletKeys } from "../queries/walletKeys";

export const useSetDefaultWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setDefaultWallet,
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: walletKeys.all });
      toast.success("Default wallet updated.");
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to set default wallet.");
    },
  });
};
