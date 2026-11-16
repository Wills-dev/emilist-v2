"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { getPaymentCheckoutUrl } from "@/lib/helpers/paymentRedirect";
import { initiateWalletFunding } from "../api/initiateWalletFunding";
import { storeWalletFunding } from "../helpers/walletFundingStorage";
import { walletKeys } from "../queries/walletKeys";
import { transactionKeys } from "../queries/transactionKeys";

export const useInitiateWalletFunding = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const userId = useStore((state) => state.currentUser?._id);
  return useMutation({
    mutationFn: initiateWalletFunding,
    retry: false,
    onSuccess: async (response, payload) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: walletKeys.all }),
        queryClient.invalidateQueries({ queryKey: transactionKeys.all }),
      ]);
      if (payload.paymentMethod === "BankTransfer") {
        toast.info("Your transfer has been submitted and is awaiting confirmation.");
        onClose();
        return;
      }
      try {
        const data = typeof response.data === "object" ? response.data : undefined;
        const checkout = getPaymentCheckoutUrl({ ...response, data });
        if (!data?.reference || !data.transactionId || !userId) throw new Error("Funding was initiated, but its payment reference could not be saved. Check your transactions before trying again.");
        storeWalletFunding({ userId, walletId: payload.walletId, reference: data.reference, transactionId: data.transactionId });
        window.location.assign(checkout);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to open Paystack checkout. Check your transactions before trying again.");
        onClose();
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to initiate wallet funding.");
    },
  });
};
