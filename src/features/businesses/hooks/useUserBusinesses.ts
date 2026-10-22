"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchUserBusinesses } from "../api";

export const useUserBusinesses = () => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: ["user-businesses", userId],
    queryFn: ({ signal }) => fetchUserBusinesses(signal),
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
