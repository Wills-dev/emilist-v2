"use client";

import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { checkoutCart } from "../api/cart";
import type { Cart, CheckoutCartPayload, CheckoutOrder } from "../types";
import { payForCart } from "@/features/payments/api/payForProduct";
import type {
  CartPaymentCurrency,
  CartPaymentMethod,
} from "@/features/payments/types/cartPayment";
import { fetchOrder } from "@/features/orders/api/orders";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { getPaymentCheckoutUrl, getPaymentReturnUrl } from "@/lib/helpers/paymentRedirect";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";

type CheckoutVariables = CheckoutCartPayload & {
  currency: CartPaymentCurrency;
  paymentMethod: CartPaymentMethod;
};

type CheckoutResult =
  | { kind: "card"; paymentUrl: string }
  | { kind: "paid"; order: CheckoutOrder };

const isCartPaymentCurrency = (
  currency: string,
): currency is CartPaymentCurrency =>
  ["NGN", "USD", "GBP", "EUR", "CAD"].includes(currency);

export const useCheckoutCart = () => {
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);
  const setCart = useCartStore((state) => state.setCart);

  const mutation = useMutation({
    mutationFn: async ({
      paymentMethod,
      currency,
      ...checkoutPayload
    }: CheckoutVariables): Promise<CheckoutResult> => {
      const order = await checkoutCart(checkoutPayload);
      if (!order._id || !order.cartId) {
        throw new Error("Checkout succeeded without returning an order and cart ID.");
      }

      const cart =
        queryClient.getQueryData<Cart | null>(["cart"]) ??
        useCartStore.getState().cart;
      if (cart) {
        const checkedOutCart = { ...cart, status: "checkedOut" };
        setCart(checkedOutCart);
        queryClient.setQueryData(["cart"], checkedOutCart);
      }

      if (order.paymentStatus === "paid") {
        return { kind: "paid", order };
      }

      const redirectUrl = getPaymentReturnUrl(
        `${routes.dashboardLinks.paymentCallback}?orderId=${encodeURIComponent(order._id)}`,
      );
      const payment = await payForCart({
        cartId: order.cartId,
        paymentMethod,
        currency,
        redirectUrl,
      });

      if (paymentMethod === "Card") {
        if (typeof payment === "string") {
          throw new Error("Card payment did not return a Paystack checkout link.");
        }

        return {
          kind: "card",
          paymentUrl: getPaymentCheckoutUrl({ data: payment }),
        };
      }

      if (typeof payment !== "string") {
        throw new Error("Wallet payment returned an unexpected response.");
      }

      const paidOrder = await fetchOrder(order._id);
      if (paidOrder.paymentStatus !== "paid") {
        throw new Error(
          "Wallet payment was submitted, but the order is not marked as paid yet. Check your orders before trying again.",
        );
      }

      return { kind: "paid", order: paidOrder };
    },
    retry: false,
    onSuccess: (result) => {
      if (result.kind === "card") {
        window.location.assign(result.paymentUrl);
        return;
      }

      toast.success("Payment successful.");
      window.location.assign(routes.dashboardLinks.orders);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        promiseErrorFunction(error);
      } else {
        toast.error(
          error instanceof Error ? error.message : "Unable to complete checkout.",
        );
      }
    },
  });

  const handleCheckout = useCallback(
    (
      payload: CheckoutCartPayload,
      paymentMethod: CartPaymentMethod,
      currency: string,
    ) => {
      if (!currentUser) {
        setIsModalFlow(true);
        openModal("login");
        return;
      }

      if (!isCartPaymentCurrency(currency)) {
        toast.error("This cart currency is not supported for payment.");
        return;
      }

      if (mutation.isPending) return;

      mutation.mutate({
        ...payload,
        paymentMethod,
        currency,
      });
    },
    [currentUser, mutation, openModal, setIsModalFlow],
  );

  return {
    handleCheckout,
    isCheckingOut: mutation.isPending,
  };
};
