"use client";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchComparedBusinesses } from "../api/compareBusiness";
import { businessKeys } from "../queries/businessKeys";

export const useComparedBusinesses = (enabled = true) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({ queryKey: businessKeys.compared(userId), queryFn: ({ signal }) => fetchComparedBusinesses(signal), enabled: enabled && Boolean(userId), staleTime: 30_000, retry: 1 });
};
