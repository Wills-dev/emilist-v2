import { axiosInstance } from "@/lib/axiosInstance";
import type { CreateWalletPayload } from "../types/wallets";

export const createWallet = async (payload: CreateWalletPayload) => {
  const { data } = await axiosInstance.post<{ message?: string; success?: boolean; status?: boolean | string }>("/wallet/create-wallet", payload);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") {
    throw new Error(data.message || "Unable to create wallet.");
  }
  return data;
};
