"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchBanks } from "../api/fetchBanks";
import { walletKeys } from "../queries/walletKeys";

export const useFetchBanks = () => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: [...walletKeys.all, "banks", userId],
    queryFn: ({ signal }) => fetchBanks(signal),
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
