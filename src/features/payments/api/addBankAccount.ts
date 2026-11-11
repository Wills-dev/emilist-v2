import { axiosInstance } from "@/lib/axiosInstance";
import type { AddBankAccountPayload, WalletActionResponse } from "../types/payouts";

export const addBankAccount = async (payload: AddBankAccountPayload) => {
  const { data } = await axiosInstance.post<WalletActionResponse>("/wallet/add-bank-account", payload);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") {
    throw new Error(data.message || "Unable to add bank account.");
  }
  return data;
};
