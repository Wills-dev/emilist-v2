import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCartItems } from "../api/cart";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";

export const useGetCartItems = () => {
  const currentUser = useStore((state) => state.currentUser);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const setCart = useCartStore((state) => state.setCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const cart = useCartStore((state) => state.cart);

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: isAuthInitialized && Boolean(currentUser),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (query.data !== undefined) {
      setCart(query.data);
    }
  }, [query.data, setCart]);

  useEffect(() => {
    if (isAuthInitialized && !currentUser) {
      clearCart();
    }
  }, [clearCart, currentUser, isAuthInitialized]);

  const activeCart =
    !isAuthInitialized || !currentUser
      ? null
      : query.data !== undefined
        ? query.data
        : cart;

  return {
    ...query,
    cart: activeCart,
    isLoading: !isAuthInitialized || query.isLoading,
  };
};
