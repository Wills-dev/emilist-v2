"use client";

import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { formatInputTextNumberWithCommas, removeNumberCommas } from "@/lib/helpers/formatNumbers";
import { getPaymentReturnUrl } from "@/lib/helpers/paymentRedirect";
import { routes } from "@/lib/helpers/routes";
import type { Wallet } from "../types";
import { useInitiateWalletFunding } from "./useInitiateWalletFunding";

export interface FundWalletFormParams {
  wallets: Wallet[];
  selectedWalletId: string;
  onClose: () => void;
}

export const useFundWalletForm = ({ wallets, selectedWalletId, onClose }: FundWalletFormParams) => {
  const [walletId, setWalletId] = useState(selectedWalletId || wallets[0]?.id || "");
  const [amountInput, setAmountInput] = useState("");
  const [chosenMethod, setPaymentMethod] = useState<"Card" | "BankTransfer">("Card");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptError, setReceiptError] = useState("");
  const wallet = wallets.find((item) => item.id === walletId);
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => setAmountInput(formatInputTextNumberWithCommas(event.target.value));
  const amount = Number(removeNumberCommas(amountInput));
  const validAmount = Number.isFinite(amount) && amount > 0 && Number.isSafeInteger(Math.round(amount * 100)) && Math.abs(amount * 100 - Math.round(amount * 100)) < 0.000001;
  const supportedCurrency = wallet?.currency === "NGN";
  const paymentMethod = supportedCurrency ? chosenMethod : "BankTransfer";
  const handleReceiptChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    const valid = !file || file.type.startsWith("image/");
    setReceipt(valid ? file : null);
    setReceiptError(valid ? "" : "Please select an image of your transfer receipt.");
  };
  const handleWalletChange = (id: string) => {
    setWalletId(id);
    setReceipt(null);
    setReceiptError("");
  };
  const mutation = useInitiateWalletFunding(onClose);
  const submitting = useRef(false);
  const canSubmit = Boolean(wallet?.id && validAmount && (paymentMethod === "Card" ? supportedCurrency : receipt));
  const handleClose = () => { if (!submitting.current && !mutation.isPending) onClose(); };
  const handleOpenChange = (open: boolean) => { if (!open) handleClose(); };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!wallet || !canSubmit || submitting.current || mutation.isPending) return;
    const payload = paymentMethod === "Card" ? {
      currency: wallet.currency, amount, paymentMethod: "Card" as const, walletId: wallet.id,
      redirectUrl: getPaymentReturnUrl(`${routes.dashboardLinks.payments}/complete`),
    } : receipt ? {
      currency: wallet.currency, amount, paymentMethod: "BankTransfer" as const, walletId: wallet.id, image: receipt,
    } : null;
    if (!payload) return;
    submitting.current = true;
    mutation.mutate(payload, { onSettled: () => { submitting.current = false; } });
  };
  return { walletId, setWalletId: handleWalletChange, wallet, amountInput, handleAmountChange, supportedCurrency, paymentMethod, setPaymentMethod, receipt, receiptError, handleReceiptChange, canSubmit, isSubmitting: mutation.isPending, handleClose, handleOpenChange, handleSubmit };
};
