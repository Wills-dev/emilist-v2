"use client";

import { useRef, useState, type SubmitEvent } from "react";
import type { SubscriptionPlan } from "@/features/settings/types/subscription";
import { useFetchWallets } from "@/features/payments/hooks/useFetchWallets";
import { getPaymentReturnUrl } from "@/lib/helpers/paymentRedirect";
import { useSubscribePlan } from "./useSubscribePlan";

export interface SubscribePlanFormParams {
  plan: SubscriptionPlan;
  billingCycle: "monthly" | "yearly";
  onClose: () => void;
}

export const useSubscribePlanForm = ({ plan, billingCycle, onClose }: SubscribePlanFormParams) => {
  const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const isFree = price === 0;
  const [paymentMethod, setPaymentMethod] = useState<"Wallet" | "Card">("Wallet");
  const wallets = useFetchWallets(!isFree);
  const currency = plan.currency || "NGN";
  const wallet = wallets.data?.find((item) => item.currency === currency);
  const insufficientBalance = price !== undefined && wallet?.balance !== undefined && wallet.balance < price;
  // The supplied activation contract does not yet specify how to select yearly billing.
  const yearlyUnavailable = billingCycle === "yearly" && !isFree;
  const canSubmit = Boolean(plan.id && price !== undefined && Number.isFinite(price) && price >= 0 && !yearlyUnavailable) &&
    (isFree || paymentMethod === "Card" || (!wallets.isPending && !wallets.isError && Boolean(wallet) && !insufficientBalance));
  const mutation = useSubscribePlan(isFree, onClose);
  const submitting = useRef(false);
  const handleClose = () => { if (!submitting.current && !mutation.isPending) onClose(); };
  const handleOpenChange = (open: boolean) => { if (!open) handleClose(); };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || submitting.current || mutation.isPending) return;
    const redirectUrl = getPaymentReturnUrl("/dashboard/settings?tab=subscriptions");
    submitting.current = true;
    mutation.mutate({ planId: plan.id, paymentMethod: isFree ? "Wallet" : paymentMethod, currency, redirectUrl }, { onSettled: () => { submitting.current = false; } });
  };
  return { price, isFree, paymentMethod, setPaymentMethod, wallets, currency, wallet, insufficientBalance, yearlyUnavailable, canSubmit, isSubmitting: mutation.isPending, handleClose, handleOpenChange, handleSubmit };
};
