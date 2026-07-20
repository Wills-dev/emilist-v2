import {
  Cart,
  CartItem,
  CartOrderSummary,
  CartProduct,
  ProductImage,
} from "../types";

export const getCartProduct = (item: CartItem): CartProduct | null =>
  typeof item.productId === "string" ? null : item.productId;

export const getCartProductId = (item: CartItem) =>
  typeof item.productId === "string" ? item.productId : item.productId._id;

export const getCartItemCount = (cart: Cart | null) =>
  cart?.cartQuantity ??
  cart?.products?.reduce((total, item) => total + item.quantity, 0) ??
  0;

export const getCartProductCount = (cart: Cart | null) =>
  cart?.products?.length ?? 0;

export const getCartCurrency = (cart: Cart | null) => {
  const firstItem = cart?.products?.[0];
  const product = firstItem ? getCartProduct(firstItem) : null;

  return product?.currency ?? "NGN";
};

export const getCartOrderSummary = (cart: Cart | null): CartOrderSummary => {
  const summary = cart?.orderSummary;
  const totalAmount = cart?.totalAmount ?? 0;

  return {
    subtotalAmount: summary?.subtotalAmount ?? totalAmount,
    discountAmount: summary?.discountAmount ?? 0,
    taxAmount: summary?.taxAmount ?? 0,
    shippingAmount: summary?.shippingAmount ?? 0,
    totalAmount: summary?.totalAmount ?? totalAmount,
  };
};

export const getCartProductImage = (images?: ProductImage[]) => {
  const firstImage = images?.[0];

  if (typeof firstImage === "string") return firstImage;

  return firstImage?.imageUrl ?? firstImage?.secure_url ?? firstImage?.url;
};

export const getCartProductCategory = (category?: CartProduct["category"]) =>
  typeof category === "string" ? category : category?.name;
