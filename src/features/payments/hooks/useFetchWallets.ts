"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchWallets } from "../api/fetchWallets";
import { walletKeys } from "../queries/walletKeys";

export const useFetchWallets = () => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: walletKeys.list(userId),
    queryFn: ({ signal }) => fetchWallets(signal),
    enabled: Boolean(userId),
    staleTime: 0,
    retry: 1,
  });
};
