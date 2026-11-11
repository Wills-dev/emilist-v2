import { axiosInstance } from "@/lib/axiosInstance";
import type { FundWalletPayload, FundWalletResponse } from "../types/fundWallet";

export const initiateWalletFunding = async (payload: FundWalletPayload) => {
  const { data } = await axiosInstance.post<FundWalletResponse>("/wallet/initiate-wallet-funding", payload);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") {
    throw new Error(data.message || "Unable to initiate wallet funding.");
  }
  return data;
};
