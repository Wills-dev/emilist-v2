"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { withdrawFunds } from "../api/withdrawFunds";
import { walletKeys } from "../queries/walletKeys";

export const useWithdrawFunds = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: withdrawFunds,
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: walletKeys.all });
      toast.success("Withdrawal requested. Awaiting admin approval.");
      onSuccess();
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to request withdrawal.");
    },
  });
};
