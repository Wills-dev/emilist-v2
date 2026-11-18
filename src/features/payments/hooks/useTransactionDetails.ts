"use client";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchTransactionDetails } from "../api/fetchTransactions";
import { transactionKeys } from "../queries/transactionKeys";

export const useTransactionDetails = (transactionId: string, onClose: () => void) => {
  const userId = useStore((state) => state.currentUser?._id);
  const query = useQuery({ queryKey: [...transactionKeys.detail(userId, transactionId), "full"], queryFn: ({ signal }) => fetchTransactionDetails(transactionId, signal), enabled: Boolean(userId && transactionId), retry: 1 });
  const changeOpen = (open: boolean) => { if (!open) onClose(); };
  const refresh = () => { void query.refetch(); };
  return { query, changeOpen, refresh };
};
