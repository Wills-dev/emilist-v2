"use client";

import { useState } from "react";
import { toast } from "sonner";

import { BankDetailsFormValues } from "../types/bank";

const createBankDetails = (): BankDetailsFormValues => ({
  id: crypto.randomUUID(),
  bankName: "",
  accountName: "",
  accountNumber: "",
  country: "",
});

export const useBankDetailsForm = () => {
  const [accounts, setAccounts] = useState<BankDetailsFormValues[]>(() => [
    createBankDetails(),
  ]);
  const [passwords, setPasswords] = useState<Record<string, string>>({});
  const [savedAccountIds, setSavedAccountIds] = useState<string[]>([]);

  const updateAccount = (
    id: string,
    field: keyof Omit<BankDetailsFormValues, "id">,
    value: string,
  ) => {
    setAccounts((current) =>
      current.map((account) =>
        account.id === id ? { ...account, [field]: value } : account,
      ),
    );
    setSavedAccountIds((current) =>
      current.filter((accountId) => accountId !== id),
    );
  };

  const updatePassword = (id: string, value: string) =>
    setPasswords((current) => ({ ...current, [id]: value }));

  const addAccount = () =>
    setAccounts((current) => [...current, createBankDetails()]);

  const removeAccount = (id: string) => {
    setAccounts((current) => current.filter((account) => account.id !== id));
    setSavedAccountIds((current) =>
      current.filter((accountId) => accountId !== id),
    );
    setPasswords((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const saveAccount = (id: string) => {
    const account = accounts.find((item) => item.id === id);
    const isComplete =
      account &&
      Object.entries(account).every(
        ([key, value]) => key === "id" || Boolean(value.trim()),
      );

    if (!isComplete) {
      toast.error("Complete all bank details before saving.");
      return;
    }
    if (!passwords[id]?.trim()) {
      toast.error("Enter your Emilist password to save this bank account.");
      return;
    }

    setSavedAccountIds((current) =>
      current.includes(id) ? current : [...current, id],
    );
    setPasswords((current) => ({ ...current, [id]: "" }));
  };

  const hasExistingBankDetails = savedAccountIds.length > 0;
  const canAddAccount =
    hasExistingBankDetails &&
    accounts.every((account) => savedAccountIds.includes(account.id));

  return {
    accounts,
    updateAccount,
    addAccount,
    removeAccount,
    passwords,
    updatePassword,
    saveAccount,
    savedAccountIds,
    hasExistingBankDetails,
    canAddAccount,
  };
};

export type BankDetailsFormController = ReturnType<typeof useBankDetailsForm>;
