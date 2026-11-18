"use client";
import { useState, type ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchSupportTickets } from "../api";
import { supportKeys } from "../queries/supportKeys";

export const useSupportTickets = () => {
  const userId = useStore((state) => state.currentUser?._id);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const filters = { page, limit: 10, ...(status ? { status } : {}), ...(category ? { category } : {}) };
  const query = useQuery({ queryKey: supportKeys.list(userId, filters), queryFn: ({ signal }) => fetchSupportTickets(filters, signal), enabled: Boolean(userId), staleTime: 15_000, refetchInterval: 30_000, retry: 1 });
  const changeStatus = (event: ChangeEvent<HTMLSelectElement>) => { setStatus(event.target.value); setPage(1); };
  const changeCategory = (event: ChangeEvent<HTMLSelectElement>) => { setCategory(event.target.value); setPage(1); };
  const clear = () => { setStatus(""); setCategory(""); setPage(1); };
  const previous = () => setPage(Math.max(1, page - 1));
  const next = () => { if (page < (query.data?.pages ?? 0)) setPage(page + 1); };
  const retry = () => { void query.refetch(); };
  return { query, page, status, category, changeStatus, changeCategory, clear, previous, next, retry };
};
