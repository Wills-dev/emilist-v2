import { create } from "zustand";
import { Cart } from "@/features/materials/types";

interface CartState {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
  clearCart: () => set({ cart: null }),
}));
