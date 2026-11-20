"use client";

import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { payForCart } from "@/features/payments/api/payForProduct";
import type { CartPaymentMethod } from "@/features/payments/types/cartPayment";
import { getPaymentCheckoutUrl, getPaymentReturnUrl } from "@/lib/helpers/paymentRedirect";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";
import {
  cancelOrder,
  fetchOrder,
  rateOrderedProduct,
  reorderOrder,
  returnOrder,
} from "../api/orders";
import type { CustomerOrder } from "../types/order";
import { orderKeys } from "../queries/orderKeys";

const isReturnWindowOpen = (order: CustomerOrder) => {
  if (order.deliveryStatus !== "delivered" || !order.deliveredAt) return false;
  const deliveredAt = new Date(order.deliveredAt).getTime();
  return (
    Number.isFinite(deliveredAt) &&
    Date.now() <= deliveredAt + 7 * 24 * 60 * 60 * 1000
  );
};

export const getOrderActions = (order: CustomerOrder) => ({
  canPay: order.paymentStatus === "unpaid" || order.paymentStatus === "failed",
  canCancel:
    order.deliveryStatus === "orderConfirmed" &&
    order.paymentStatus === "paid",
  canTrack: !["canceled", "returned"].includes(order.deliveryStatus),
  canReturn: isReturnWindowOpen(order),
  canReorder: order.deliveryStatus === "delivered",
  canReview: order.deliveryStatus === "delivered",
});

export const useOrderActions = (order: CustomerOrder) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const userId = useStore((state) => state.currentUser?._id);
  const setCart = useCartStore((state) => state.setCart);

  const refreshOrder = useCallback(async () => {
    const updated = await fetchOrder(order._id);
    if (userId) {
      queryClient.setQueryData(orderKeys.detail(userId, order._id), updated);
    }
    await queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    return updated;
  }, [order._id, queryClient, userId]);

  const handleError = useCallback((error: unknown) => {
    if (isAxiosError(error)) promiseErrorFunction(error);
    else toast.error(error instanceof Error ? error.message : "Order action failed.");
  }, []);

  const cancellation = useMutation({
    mutationFn: async (reason: string) => {
      await cancelOrder({ orderId: order._id, reason });
      return refreshOrder();
    },
    onSuccess: () => toast.success("Order canceled and status refreshed."),
    onError: handleError,
  });

  const returnRequest = useMutation({
    mutationFn: async (reason: string) => {
      await returnOrder({ orderId: order._id, reason });
      return refreshOrder();
    },
    onSuccess: () => toast.success("Return request submitted."),
    onError: handleError,
  });

  const reorder = useMutation({
    mutationFn: () => reorderOrder(order._id),
    onSuccess: async (cart) => {
      setCart(cart);
      queryClient.setQueryData(["cart"], cart);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Items added to a new cart at current prices.");
      router.push(routes.dashboardLinks.dashboardCart);
    },
    onError: handleError,
  });

  const rating = useMutation({
    mutationFn: async (input: {
      productId: string;
      rating: number;
      comment: string;
    }) => {
      await rateOrderedProduct({ orderId: order._id, ...input });
      return refreshOrder();
    },
    onSuccess: () => toast.success("Product review submitted."),
    onError: handleError,
  });

  const payment = useMutation({
    mutationFn: async (paymentMethod: CartPaymentMethod) => {
      const result = await payForCart({
        cartId: order.cartId,
        paymentMethod,
        currency: "NGN",
        redirectUrl: getPaymentReturnUrl(
          `${routes.dashboardLinks.paymentCallback}?orderId=${encodeURIComponent(order._id)}`,
        ),
      });

      if (paymentMethod === "Card") {
        if (typeof result === "string") {
          throw new Error("Card payment did not return a Paystack checkout link.");
        }
        return { kind: "card" as const, url: getPaymentCheckoutUrl({ data: result }) };
      }

      if (typeof result !== "string") {
        throw new Error("Wallet payment returned an unexpected response.");
      }

      const updated = await refreshOrder();
      if (updated.paymentStatus !== "paid") {
        throw new Error("The order is not marked paid yet. Check your orders before retrying.");
      }
      return { kind: "paid" as const };
    },
    onSuccess: (result) => {
      if (result.kind === "card") {
        window.location.assign(result.url);
        return;
      }
      toast.success("Payment successful.");
    },
    onError: handleError,
  });

  return {
    cancel: cancellation.mutateAsync,
    isCanceling: cancellation.isPending,
    returnOrder: returnRequest.mutateAsync,
    isReturning: returnRequest.isPending,
    reorder: reorder.mutate,
    isReordering: reorder.isPending,
    rateProduct: rating.mutateAsync,
    isRating: rating.isPending,
    pay: payment.mutate,
    isPaying: payment.isPending,
    actions: getOrderActions(order),
  };
};
