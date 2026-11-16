"use client";

import { useEffect } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchWalletTransactions, fetchMyTransaction } from "../api/fetchTransactions";
import { walletKeys } from "../queries/walletKeys";
import { transactionKeys } from "../queries/transactionKeys";

export const useWalletTransactions = (walletId: string, currency: string) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useInfiniteQuery({
    queryKey: transactionKeys.list(userId, walletId),
    queryFn: ({ pageParam, signal }) => fetchWalletTransactions(walletId, currency, pageParam, 20, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(userId && walletId),
    staleTime: 0,
    retry: 1,
  });
};
export const useWalletTransaction = (transactionId: string, enabled = true) => {
  const userId = useStore((state) => state.currentUser?._id);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: transactionKeys.detail(userId, transactionId),
    queryFn: ({ signal }) => fetchMyTransaction(transactionId, signal),
    enabled: enabled && Boolean(userId && transactionId),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return (status === "pending" || status === "processing") && query.state.dataUpdateCount + query.state.errorUpdateCount < 10 ? 2000 : false;
    },
  });
  const status = query.data?.status;
  useEffect(() => {
    if (status !== "successful" && status !== "failed") return;
    void queryClient.invalidateQueries({ queryKey: walletKeys.all });
    void queryClient.invalidateQueries({ queryKey: [...transactionKeys.all, "list"] });
  }, [status, transactionId, queryClient]);
  return query;
};
