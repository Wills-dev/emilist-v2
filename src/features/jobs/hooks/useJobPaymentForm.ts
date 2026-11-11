"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { getPaymentReturnUrl } from "@/lib/helpers/paymentRedirect";
import { useFetchWallets } from "@/features/payments/hooks/useFetchWallets";
import type { JobInvoice } from "../types/jobManagement";
import type { JobPaymentMethod } from "../types/payForJob";
import { usePayForJob } from "./usePayForJob";

export interface JobPaymentFormParams {
  jobId: string;
  invoice: JobInvoice;
  onClose: () => void;
}

export const useJobPaymentForm = ({ jobId, invoice, onClose }: JobPaymentFormParams) => {
  const [paymentMethod, setPaymentMethod] = useState<JobPaymentMethod>("Wallet");
  const [isAdditionalAmount, setIsAdditionalAmount] = useState(false);
  const wallets = useFetchWallets();
  const mutation = usePayForJob(onClose);
  const submitting = useRef(false);
  const currency = invoice.currency.toUpperCase();
  const wallet = wallets.data?.find((item) => item.currency === currency);
  const milestoneAmount = invoice.subtotal ?? invoice.amount - (invoice.additionalAmount ?? 0);
  const additionalAmount = invoice.additionalAmount ?? 0;
  const amount = (Math.round(milestoneAmount * 100) + (isAdditionalAmount ? Math.round(additionalAmount * 100) : 0)) / 100;
  const insufficientBalance = wallet?.balance !== undefined && wallet.balance < amount;
  const canSubmit = Boolean(jobId && invoice.id && Number.isFinite(milestoneAmount) && milestoneAmount > 0 && Number.isFinite(amount) && amount > 0 && invoice.status !== "paid" && invoice.status !== "pending" && !invoice.paidAt) &&
    (paymentMethod === "Card" || (!wallets.isPending && !wallets.isError && Boolean(wallet) && !insufficientBalance));
  const handleClose = () => { if (!submitting.current && !mutation.isPending) onClose(); };
  const handleOpenChange = (open: boolean) => { if (!open) handleClose(); };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || submitting.current || mutation.isPending) return;
    submitting.current = true;
    mutation.mutate({ jobId, milestoneId: invoice.milestoneId ?? invoice.id, paymentMethod, currency, isAdditionalAmount, redirectUrl: getPaymentReturnUrl() }, {
      onSettled: () => { submitting.current = false; },
    });
  };
  return {
    paymentMethod, setPaymentMethod, isAdditionalAmount, setIsAdditionalAmount,
    wallets, wallet, currency, milestoneAmount, additionalAmount, amount, insufficientBalance, canSubmit,
    isSubmitting: mutation.isPending, handleClose, handleOpenChange, handleSubmit,
  };
};
