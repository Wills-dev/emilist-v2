"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { fetchOrder } from "../api/orders";
import { orderKeys } from "../queries/orderKeys";

export const useGetOrder = (orderId: string, enabled: boolean) => {
  const userId = useStore((state) => state.currentUser?._id);

  return useQuery({
    queryKey: orderKeys.detail(userId ?? "anonymous", orderId),
    queryFn: () => fetchOrder(orderId),
    enabled: Boolean(enabled && userId && orderId),
    retry: 1,
  });
};
