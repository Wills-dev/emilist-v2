import { axiosInstance } from "@/lib/axiosInstance";
import {
  AddToCartPayload,
  ApplyDiscountCodePayload,
  Cart,
  CheckoutCartPayload,
  CheckoutOrder,
} from "../types";

interface ApiResponse<T> {
  data: T;
}

export const getCartItems = async (): Promise<Cart | null> => {
  const { data } = await axiosInstance.get<ApiResponse<Cart | null>>(
    "/cart/get-cart-items",
  );
  return data.data;
};

const refreshCart = () => getCartItems();

export const addToCart = async (payload: AddToCartPayload) => {
  if (payload.quantity < 1) {
    throw new Error("Quantity must be at least one.");
  }

  await axiosInstance.post("/cart/add-to-cart", payload);
  return refreshCart();
};

export const increaseCartQuantity = async (productId: string) => {
  await axiosInstance.patch(
    `/cart/increase-quantity/${encodeURIComponent(productId)}`,
  );
  return refreshCart();
};

export const reduceCartQuantity = async (productId: string) => {
  await axiosInstance.patch(
    `/cart/reduce-quantity/${encodeURIComponent(productId)}`,
  );
  return refreshCart();
};

export const removeFromCart = async (productId: string) => {
  await axiosInstance.patch(
    `/cart/remove-from-cart/${encodeURIComponent(productId)}`,
  );
  return refreshCart();
};

export const clearCart = async () => {
  await axiosInstance.delete("/cart/clear");
  return refreshCart();
};

export const applyDiscountCode = async ({
  code,
}: ApplyDiscountCodePayload) => {
  await axiosInstance.post("/cart/apply-discount-code", {
    code: code.trim().toUpperCase(),
  });
  return refreshCart();
};

export const removeCartPromo = async (code: string) => {
  await axiosInstance.delete(
    `/cart/remove-promo-code/${encodeURIComponent(code)}`,
  );
  return refreshCart();
};

export const checkoutCart = async (
  payload: CheckoutCartPayload,
): Promise<CheckoutOrder> => {
  const { data } = await axiosInstance.post<ApiResponse<CheckoutOrder>>(
    "/cart/checkout",
    payload,
  );
  return data.data;
};
