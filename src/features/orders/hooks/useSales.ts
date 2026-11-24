"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { cancelOrder, fetchSales, updateOrderDeliveryStatus } from "../api/orders";
import { orderKeys } from "../queries/orderKeys";
import type { OrdersQuery } from "../types/order";

export const useSales = (query: OrdersQuery) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({ queryKey: [...orderKeys.all, "sales", userId, query], queryFn: ({ signal }) => fetchSales(query, signal), enabled: Boolean(userId), retry: 1 });
};
export const useSaleActions = (orderId: string) => {
  const client = useQueryClient();
  const update = useMutation({ mutationFn: updateOrderDeliveryStatus, onSuccess: async () => { await client.invalidateQueries({ queryKey: orderKeys.all }); toast.success("Delivery status updated."); }, onError: promiseErrorFunction });
  const cancel = useMutation({ mutationFn: (reason: string) => cancelOrder({ orderId, reason }), onSuccess: async () => { await client.invalidateQueries({ queryKey: orderKeys.all }); toast.success("Order canceled."); }, onError: promiseErrorFunction });
  return { update: (status: "outForDelivery" | "delivered") => update.mutateAsync({ orderId, status, note: status === "outForDelivery" ? "Package dispatched by seller" : "Delivery confirmed by seller" }), cancel: cancel.mutateAsync, busy: update.isPending || cancel.isPending };
};
