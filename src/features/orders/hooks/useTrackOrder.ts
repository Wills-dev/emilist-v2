"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { trackOrder } from "../api/orders";
import { orderKeys } from "../queries/orderKeys";
import type { OrderDeliveryStatus } from "../types/order";

export type OrderTrackingStatus = OrderDeliveryStatus;

export const useTrackOrder = (orderId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const userId = useStore((state) => state.currentUser?._id);
  const tracking = useQuery({
    queryKey: orderKeys.tracking(userId ?? "anonymous", orderId),
    queryFn: () => trackOrder(orderId),
    enabled: isOpen && Boolean(userId && orderId),
    retry: 1,
  });

  return {
    ...tracking,
    isOpen,
    openModal: () => setIsOpen(true),
    handleModalChange: setIsOpen,
  };
};
