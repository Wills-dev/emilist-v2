import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { applyDiscountCode, removeCartPromo } from "../api/cart";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ApiErrorResponse } from "@/lib/types/error";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";
import type { Cart } from "../types";

export const useApplyDiscountCode = () => {
  const [code, setCode] = useState("");
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);
  const isCartLocked = cart?.status === "checkedOut";

  const updateCart = useCallback(
    (updatedCart: Cart | null) => {
      queryClient.setQueryData(["cart"], updatedCart);
      setCart(updatedCart);
    },
    [queryClient, setCart],
  );

  const { mutate: applyCode, isPending: isApplyingDiscount } = useMutation({
    mutationFn: applyDiscountCode,
    onSuccess: (updatedCart) => {
      updateCart(updatedCart);
      setCode("");
      toast.success("Discount code applied.");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const { mutate: removeCode, isPending: isRemovingDiscount } = useMutation({
    mutationFn: removeCartPromo,
    onSuccess: (updatedCart) => {
      updateCart(updatedCart);
      toast.success("Promo code removed.");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleCodeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCode(event.target.value.toUpperCase());
    },
    [],
  );

  const requireEditableCart = useCallback(() => {
    if (isCartLocked) {
      toast.error("This cart has been checked out and can no longer be changed.");
      return false;
    }

    if (currentUser) return true;

    setIsModalFlow(true);
    openModal("login");
    return false;
  }, [currentUser, isCartLocked, openModal, setIsModalFlow]);

  const handleApplyDiscount = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!requireEditableCart()) return;

      const trimmedCode = code.trim();

      if (!trimmedCode) {
        toast.error("Enter a discount code to continue.");
        return;
      }

      applyCode({ code: trimmedCode });
    },
    [applyCode, code, requireEditableCart],
  );

  const handleRemoveDiscount = useCallback(
    (promoCode: string) => {
      if (requireEditableCart()) removeCode(promoCode);
    },
    [removeCode, requireEditableCart],
  );

  return {
    code,
    handleApplyDiscount,
    handleCodeChange,
    handleRemoveDiscount,
    isApplyingDiscount,
    isRemovingDiscount,
    isCartLocked,
  };
};
