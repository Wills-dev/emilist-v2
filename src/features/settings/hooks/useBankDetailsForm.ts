"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { updateAccountDetails } from "../api/updateAccountDetails";
import { bankDetailsError, bankDetailsPayload } from "../helpers/bankDetails";
import { reportFormError } from "@/lib/helpers/formValidation";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

import { BankDetailsFormValues } from "../types/bank";

const createBankDetails = (): BankDetailsFormValues => ({
  id: crypto.randomUUID(),
  bankName: "",
  accountName: "",
  accountNumber: "",
  country: "",
});

export const useBankDetailsForm = () => {
  const client = useQueryClient();
  const saving = useRef(false);
  const [savingAccountId, setSavingAccountId] = useState<string | null>(null);
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

  const saveAccount = async (id: string) => {
    if (saving.current) return;
    const account = accounts.find((item) => item.id === id);
    if (!account) return;
    const password = passwords[id] ?? "";
    const error = bankDetailsError(account, password);
    if (error) { reportFormError(`bank-${id}-${error.field}`, error.message); return; }
    saving.current = true;
    setSavingAccountId(id);
    try {
      await updateAccountDetails(bankDetailsPayload(account, password));
      setSavedAccountIds((current) => current.includes(id) ? current : [...current, id]);
      toast.success("Bank details saved successfully.");
      void client.invalidateQueries({ queryKey: ["currentUser"] });
    } catch (error) {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to save bank details.");
    } finally {
      setPasswords((current) => ({ ...current, [id]: "" }));
      saving.current = false;
      setSavingAccountId(null);
    }
  };

  const hasExistingBankDetails = savedAccountIds.length > 0;
  const canAddAccount =
    hasExistingBankDetails &&
    accounts.every((account) => savedAccountIds.includes(account.id));

  return {
    accounts,
    savingAccountId,
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
