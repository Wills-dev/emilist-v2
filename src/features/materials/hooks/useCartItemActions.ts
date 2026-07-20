import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  increaseCartQuantity,
  reduceCartQuantity,
  removeFromCart,
} from "../api/cart";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ApiErrorResponse } from "@/lib/types/error";
import { useStore } from "@/store/authStore";

export const useCartItemActions = () => {
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, [queryClient]);

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
    onSuccess: () => {
      handleSuccess();
      toast.success("Material removed from cart.");
    },
    onError: handleError,
  });

  const canManageCart = useCallback(() => {
    if (currentUser) return true;

    setIsModalFlow(true);
    openModal("login");
    return false;
  }, [currentUser, openModal, setIsModalFlow]);

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
    isCartItemUpdating,
  };
};
