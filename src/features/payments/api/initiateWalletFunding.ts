import { axiosInstance } from "@/lib/axiosInstance";
import type { FundWalletPayload, FundWalletResponse } from "../types/fundWallet";

export const initiateWalletFunding = async (payload: FundWalletPayload) => {
  let body: FundWalletPayload | FormData = payload;
  if (payload.paymentMethod === "BankTransfer") {
    body = new FormData();
    body.append("walletId", payload.walletId);
    body.append("currency", payload.currency);
    body.append("amount", String(payload.amount));
    body.append("paymentMethod", payload.paymentMethod);
    body.append("image", payload.image);
  }
  // axiosInstance removes Content-Type for FormData so the browser sets the boundary.
  const { data } = await axiosInstance.post<FundWalletResponse>("/wallet/initiate-wallet-funding", body);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") throw new Error(data.message || "Unable to initiate wallet funding.");
  return data;
};
