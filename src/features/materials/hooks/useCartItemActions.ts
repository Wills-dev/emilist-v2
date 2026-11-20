import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  clearCart,
  increaseCartQuantity,
  reduceCartQuantity,
  removeFromCart,
} from "../api/cart";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ApiErrorResponse } from "@/lib/types/error";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";
import type { Cart } from "../types";

export const useCartItemActions = () => {
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);
  const isCartLocked = cart?.status === "checkedOut";

  const handleSuccess = useCallback(
    (updatedCart: Cart | null) => {
      queryClient.setQueryData(["cart"], updatedCart);
      setCart(updatedCart);
    },
    [queryClient, setCart],
  );

  const handleError = useCallback((error: ApiErrorResponse) => {
    promiseErrorFunction(error);
  }, []);

  const {
    mutate: increaseQuantity,
    isPending: isIncreasingQuantity,
    variables: increasingProductId,
  } = useMutation({
    mutationFn: increaseCartQuantity,
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const {
    mutate: reduceQuantity,
    isPending: isReducingQuantity,
    variables: reducingProductId,
  } = useMutation({
    mutationFn: reduceCartQuantity,
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const {
    mutate: removeCartItem,
    isPending: isRemovingCartItem,
    variables: removingProductId,
  } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (updatedCart) => {
      handleSuccess(updatedCart);
      toast.success("Material removed from cart.");
    },
    onError: handleError,
  });
  const { mutate: clearCartItems, isPending: isClearingCart } = useMutation({
    mutationFn: clearCart,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const canManageCart = useCallback(() => {
    if (isCartLocked) {
      toast.error("This cart has been checked out and can no longer be changed.");
      return false;
    }

    if (currentUser) return true;

    setIsModalFlow(true);
    openModal("login");
    return false;
  }, [currentUser, isCartLocked, openModal, setIsModalFlow]);

  const handleIncreaseQuantity = useCallback(
    (productId: string) => {
      if (canManageCart()) increaseQuantity(productId);
    },
    [canManageCart, increaseQuantity],
  );

  const handleReduceQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity > 1 && canManageCart()) reduceQuantity(productId);
    },
    [canManageCart, reduceQuantity],
  );

  const handleRemoveFromCart = useCallback(
    (productId: string) => {
      if (canManageCart()) removeCartItem(productId);
    },
    [canManageCart, removeCartItem],
  );

  const handleClearCart = useCallback(() => {
    if (canManageCart()) clearCartItems();
  }, [canManageCart, clearCartItems]);

  const isCartItemUpdating = useCallback(
    (productId: string) =>
      (isIncreasingQuantity && increasingProductId === productId) ||
      (isReducingQuantity && reducingProductId === productId) ||
      (isRemovingCartItem && removingProductId === productId),
    [
      increasingProductId,
      isIncreasingQuantity,
      isReducingQuantity,
      isRemovingCartItem,
      reducingProductId,
      removingProductId,
    ],
  );

  return {
    handleIncreaseQuantity,
    handleReduceQuantity,
    handleRemoveFromCart,
    handleClearCart,
    isClearingCart,
    isCartLocked,
    isCartItemUpdating,
  };
};
