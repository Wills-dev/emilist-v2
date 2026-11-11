"use client";

import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { useFetchBanks } from "./useFetchBanks";
import { useAddBankAccount } from "./useAddBankAccount";

export const useAddBankAccountForm = (onClose: () => void) => {
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const banks = useFetchBanks();
  const bankCode = banks.data?.find((bank) => JSON.stringify([bank.bankCode, bank.bankName]) === selectedBank)?.bankCode ?? "";
  const mutation = useAddBankAccount(onClose);
  const submitting = useRef(false);
  const canSubmit = !banks.isPending && !banks.isError && Boolean(banks.data?.some((bank) => bank.bankCode === bankCode)) && /^\d{10}$/.test(accountNumber);
  const handleAccountChange = (event: ChangeEvent<HTMLInputElement>) => setAccountNumber(event.target.value.replace(/\D/g, "").slice(0, 10));
  const handleClose = () => { if (!submitting.current && !mutation.isPending) onClose(); };
  const handleOpenChange = (open: boolean) => { if (!open) handleClose(); };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || mutation.isPending || submitting.current) return;
    submitting.current = true;
    mutation.mutate({ bankCode, accountNumber, currency: "NGN" }, { onSettled: () => { submitting.current = false; } });
  };
  return { selectedBank, setSelectedBank, accountNumber, handleAccountChange, banks, canSubmit, isSubmitting: mutation.isPending, handleClose, handleOpenChange, handleSubmit };
};
