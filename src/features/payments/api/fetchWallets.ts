import { axiosInstance } from "@/lib/axiosInstance";
import type { PaymentWallet } from "../types/wallets";

export const normalizeWallets = (response: unknown): PaymentWallet[] => {
  const envelope = response as { data?: unknown } | null;
  const data = envelope?.data ?? response;
  const items = Array.isArray(data) ? data : (data as { wallets?: unknown } | null)?.wallets;
  if (!Array.isArray(items)) throw new Error("Unable to read the wallets response.");
  return items.map((item: unknown) => {
    const wallet = item as { _id?: string; id?: string; currency?: string; balance?: number | string };
    if (!wallet || typeof wallet.currency !== "string") throw new Error("A wallet is missing its currency.");
    const balance = wallet.balance === undefined || wallet.balance === null || wallet.balance === "" ? undefined : Number(wallet.balance);
    return {
      id: wallet._id ?? wallet.id ?? wallet.currency,
      currency: wallet.currency.toUpperCase(),
      balance: balance !== undefined && Number.isFinite(balance) ? balance : undefined,
    };
  });
};

export const fetchWallets = async (signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<unknown>("/wallet/fetch-wallets", { signal });
  return normalizeWallets(data);
};
