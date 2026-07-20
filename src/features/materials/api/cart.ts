import { axiosInstance } from "@/lib/axiosInstance";
import {
  AddToCartPayload,
  ApplyDiscountCodePayload,
  Cart,
} from "../types";

export const addToCart = async (payload: AddToCartPayload) => {
  try {
    const { data } = await axiosInstance.post("/cart/add-to-cart", payload);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItems = async (): Promise<Cart | null> => {
  try {
    const { data } = await axiosInstance.get("/cart/get-cart-items");
    return data?.data ?? null;
  } catch (error) {
    throw error;
  }
};

export const increaseCartQuantity = async (productId: string) => {
  const { data } = await axiosInstance.patch(
    `/cart/increase-quantity/${productId}`,
  );

  return data?.data;
};

export const reduceCartQuantity = async (productId: string) => {
  const { data } = await axiosInstance.patch(
    `/cart/reduce-quantity/${productId}`,
  );

  return data?.data;
};

export const removeFromCart = async (productId: string) => {
  const { data } = await axiosInstance.patch(
    `/cart/remove-from-cart/${productId}`,
  );

  return data?.data;
};

export const applyDiscountCode = async ({ code }: ApplyDiscountCodePayload) => {
  const { data } = await axiosInstance.post("/cart/apply-discount-code", {
    code,
  });

  return data?.data;
};
