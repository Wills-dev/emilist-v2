import type { BankDetailsFormValues, UpdateAccountDetailsPayload } from "../types/bank";

export const bankDetailsError = (account: BankDetailsFormValues, password: string) => {
  if (!account.bankName.trim()) return { field: "bankName", message: "Enter your bank name." };
  if (!/^\d+$/.test(account.accountNumber.trim())) return { field: "accountNumber", message: "Enter a valid account number." };
  if (!account.accountName.trim()) return { field: "accountName", message: "Enter the account holder’s name." };
  if (!password.trim()) return { field: "password", message: "Enter your Emilist password to save this bank account." };
};

export const bankDetailsPayload = (account: BankDetailsFormValues, password: string): UpdateAccountDetailsPayload => ({
  password,
  number: account.accountNumber.trim(),
  bank: account.bankName.trim(),
  holdersName: account.accountName.trim(),
});
