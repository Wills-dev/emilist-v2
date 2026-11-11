"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { getPaymentCheckoutUrl } from "@/lib/helpers/paymentRedirect";
import { initiateWalletFunding } from "../api/initiateWalletFunding";
import { walletKeys } from "../queries/walletKeys";

export const useInitiateWalletFunding = (onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: initiateWalletFunding,
    retry: false,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: walletKeys.all });
      try {
        window.location.assign(getPaymentCheckoutUrl(response));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to open Paystack checkout.");
        onClose();
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to initiate wallet funding.");
    },
  });
};
