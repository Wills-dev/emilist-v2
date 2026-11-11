"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { getPaymentCheckoutUrl } from "@/lib/helpers/paymentRedirect";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { walletKeys } from "@/features/payments/queries/walletKeys";
import { payForJob } from "../api/payForJob";
import { jobKeys } from "../queries/jobKeys";

export const usePayForJob = (onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payForJob,
    retry: false,
    onSuccess: async (response, payload) => {
      // Invalidate before navigating so returning from checkout refreshes balances/status.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: jobKeys.all }),
        queryClient.invalidateQueries({ queryKey: walletKeys.all }),
      ]);
      if (payload.paymentMethod === "Card") {
        try {
          window.location.assign(getPaymentCheckoutUrl(response));
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to open Paystack checkout.");
          onClose();
        }
        return;
      }
      toast.success(response.message || "Wallet payment submitted successfully.");
      onClose();
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to process payment.");
    },
  });
};
