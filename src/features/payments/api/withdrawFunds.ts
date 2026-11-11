import { axiosInstance } from "@/lib/axiosInstance";
import type { WithdrawFundsPayload, WalletActionResponse } from "../types/payouts";

export const withdrawFunds = async (payload: WithdrawFundsPayload) => {
  const { data } = await axiosInstance.post<WalletActionResponse>("/wallet/withdraw-funds", payload);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") {
    throw new Error(data.message || "Unable to request withdrawal.");
  }
  return data;
};
