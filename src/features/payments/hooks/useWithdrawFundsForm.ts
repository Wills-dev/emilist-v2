"use client";

import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { formatInputTextNumberWithCommas, removeNumberCommas } from "@/lib/helpers/formatNumbers";
import type { PaymentWallet } from "../types/wallets";
import type { PayoutBankAccount } from "../types/payouts";
import { useWithdrawFunds } from "./useWithdrawFunds";

export interface WithdrawFundsFormParams {
  wallet: PaymentWallet;
  bankAccount: PayoutBankAccount;
  onClose: () => void;
}

export const useWithdrawFundsForm = ({ wallet, bankAccount, onClose }: WithdrawFundsFormParams) => {
  const [amountInput, setAmountInput] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const amount = Number(removeNumberCommas(amountInput));
  const validAmount = Number.isFinite(amount) && amount > 0 && Number.isSafeInteger(Math.round(amount * 100)) && Math.abs(amount * 100 - Math.round(amount * 100)) < 0.000001;
  const insufficientBalance = wallet.balance !== undefined && amount > wallet.balance;
  const canSubmit = validAmount && Boolean(wallet.id && bankAccount.bankAccountId) && wallet.currency === "NGN" && bankAccount.currency === wallet.currency && wallet.balance !== undefined && Number.isFinite(wallet.balance) && !insufficientBalance;
  const mutation = useWithdrawFunds(onClose);
  const submitting = useRef(false);
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReviewing(false);
    setAmountInput(formatInputTextNumberWithCommas(event.target.value));
  };
  const handleClose = () => { if (!submitting.current && !mutation.isPending) onClose(); };
  const handleOpenChange = (open: boolean) => { if (!open) handleClose(); };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || submitting.current || mutation.isPending) return;
    if (!reviewing) { setReviewing(true); return; }
    submitting.current = true;
    mutation.mutate({ amount, currency: wallet.currency, walletId: wallet.id, bankAccountId: bankAccount.bankAccountId }, {
      onSettled: () => { submitting.current = false; },
    });
  };
  return { amountInput, amount, reviewing, setReviewing, insufficientBalance, canSubmit, handleAmountChange, isSubmitting: mutation.isPending, handleClose, handleOpenChange, handleSubmit };
};
