"use client";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchAllExperts } from "@/features/businesses/api/fetchAllExperts";
import { mapExpertListItem } from "@/features/businesses/helpers/expertList";
import { businessKeys } from "@/features/businesses/queries/businessKeys";

export const useHomeExperts = () => {
  const userId = useStore((state) => state.currentUser?._id);
  const query = useQuery({ queryKey: [...businessKeys.all, "home", userId], queryFn: ({ signal }) => fetchAllExperts({ page: 1, limit: 4, ...(userId ? { userId } : {}) }, signal), staleTime: 60_000, retry: 1 });
  const retry = () => { void query.refetch(); };
  return { query, experts: query.data?.businesses.map(mapExpertListItem) ?? [], retry };
};
