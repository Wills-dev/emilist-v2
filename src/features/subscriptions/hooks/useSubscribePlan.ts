"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { getPaymentCheckoutUrl } from "@/lib/helpers/paymentRedirect";
import { walletKeys } from "@/features/payments/queries/walletKeys";
import { subscribePlan } from "../api/subscribePlan";
import { subscriptionKeys } from "../queries/subscriptionKeys";

export const useSubscribePlan = (isFree: boolean, onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: subscribePlan,
    retry: false,
    onSuccess: async (response, payload) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: subscriptionKeys.all }),
        queryClient.invalidateQueries({ queryKey: walletKeys.all }),
      ]);
      if (!isFree && payload.paymentMethod === "Card") {
        try { window.location.assign(getPaymentCheckoutUrl(response)); }
        catch (error) { toast.error(error instanceof Error ? error.message : "Unable to open Paystack."); onClose(); }
        return;
      }
      toast.success(isFree ? "Free plan activated." : "Subscription request submitted.");
      onClose();
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to activate plan.");
    },
  });
};
