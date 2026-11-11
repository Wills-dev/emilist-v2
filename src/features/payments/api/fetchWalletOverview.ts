import { isAxiosError } from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import type { PayoutBankAccount, WalletOverview, WalletOverviewQuery } from "../types/payouts";
import { normalizeWallets } from "./fetchWallets";

export const fetchWalletOverview = async (query: WalletOverviewQuery, signal?: AbortSignal): Promise<WalletOverview> => {
  try {
    const { data } = await axiosInstance.get<{ data: { wallet?: unknown; wallets: unknown[]; bankAccount?: PayoutBankAccount | null } }>("/wallet/fetch-wallet-overview", { params: query, signal });
    if (!data.data || !Array.isArray(data.data.wallets)) throw new Error("Unable to read the wallet overview.");
    const wallet = data.data.wallet ? normalizeWallets([data.data.wallet])[0] : null;
    const wallets = normalizeWallets(data.data.wallets);
    return {
      wallet,
      wallets: wallets.map((item) => item.id === wallet?.id ? wallet : item),
      bankAccount: data.data.bankAccount ?? null,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404 && !query.walletId && !query.currency) {
      return { wallet: null, wallets: [], bankAccount: null };
    }
    throw error;
  }
};
