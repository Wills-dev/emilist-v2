"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { fetchOrders } from "../api/orders";
import type { OrdersQuery } from "../types/order";
import { orderKeys } from "../queries/orderKeys";

export const useGetOrders = (query: OrdersQuery) => {
  const userId = useStore((state) => state.currentUser?._id);

  return useQuery({
    queryKey: orderKeys.list(userId ?? "anonymous", query),
    queryFn: () => fetchOrders(query),
    enabled: Boolean(userId),
    staleTime: 30_000,
    retry: 1,
  });
};
