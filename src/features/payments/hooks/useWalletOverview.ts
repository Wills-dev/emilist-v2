"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchWalletOverview } from "../api/fetchWalletOverview";
import { walletKeys } from "../queries/walletKeys";
import type { WalletOverviewQuery } from "../types/payouts";

export const useWalletOverview = (query: WalletOverviewQuery = {}) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: [...walletKeys.all, "overview", userId, query],
    queryFn: ({ signal }) => fetchWalletOverview(query, signal),
    enabled: Boolean(userId),
    staleTime: 0,
    retry: 1,
  });
};
