import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addToCart } from "../api/cart";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const setCart = useCartStore((state) => state.setCart);
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);
      setCart(updatedCart);
      toast.success("Material added to cart.");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleAddToCart = useCallback(
    (productId: string, quantity = 1) => {
      if (!currentUser) {
        setIsModalFlow(true);
        openModal("login");
        return;
      }

      if (quantity < 1) {
        toast.error("Select at least one item before adding it to your cart.");
        return;
      }

      mutate({ productId, quantity });
    },
    [currentUser, mutate, openModal, setIsModalFlow],
  );

  return { handleAddToCart, isAddingToCart: isPending };
};
