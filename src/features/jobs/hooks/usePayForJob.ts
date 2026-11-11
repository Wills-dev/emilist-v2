"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
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
        const checkout = response.data?.authorization_url ?? response.data?.authorizationUrl ?? response.data?.checkoutUrl;
        if (!checkout) {
          toast.info("Payment request received, but no card checkout link was returned. Refresh the invoice before trying again.");
          onClose();
          return;
        }
        try {
          const url = new URL(checkout);
          if (url.protocol !== "https:") throw new Error("Invalid checkout URL");
          window.location.assign(url.href);
        } catch {
          toast.error("The payment provider returned an invalid checkout link. Please contact support.");
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
