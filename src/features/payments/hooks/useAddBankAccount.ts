"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { addBankAccount } from "../api/addBankAccount";
import { walletKeys } from "../queries/walletKeys";

export const useAddBankAccount = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBankAccount,
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: walletKeys.all });
      toast.success("Bank account added.");
      onSuccess();
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to add bank account.");
    },
  });
};
