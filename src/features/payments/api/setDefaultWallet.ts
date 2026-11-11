import { axiosInstance } from "@/lib/axiosInstance";

export const setDefaultWallet = async (walletId: string) => {
  if (!walletId.trim()) throw new Error("Select a wallet first.");
  const { data } = await axiosInstance.patch<{ message?: string; success?: boolean; status?: boolean | string }>(
    `/wallet/set-default-wallet/${encodeURIComponent(walletId)}`,
  );
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") {
    throw new Error(data.message || "Unable to set default wallet.");
  }
  return data;
};
