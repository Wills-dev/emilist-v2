"use client";

import { Loader2, X } from "lucide-react";

import CartCard from "../CartCard/CartCard";
import { CartItem } from "../../types";
import { useCartItemActions } from "../../hooks/useCartItemActions";
import { getCartProductId } from "../../helpers/cart";
import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";

const CartProductWrapper = ({
  variant = "primary",
  icon,
  title,
  items,
  productCount,
}: {
  title: string;
  icon: React.ReactElement;
  variant?: "primary" | "secondary";
  items: CartItem[];
  productCount: number;
}) => {
  const itemLabel = `${productCount} ${productCount === 1 ? "item" : "items"}`;
  const {
    handleIncreaseQuantity,
    handleReduceQuantity,
    handleRemoveFromCart,
    handleClearCart,
    isClearingCart,
    isCartLocked,
    isCartItemUpdating,
  } = useCartItemActions();

  return (
    <div className="w-full flex-1 space-y-5">
      <DashboardTitle title={title} icon={icon} />
      <div className="bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB] border border-[#F1F2F9] rounded-[12.75px] space-y-5 ">
        {variant === "primary" && (
          <div className="py-6 px-5">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F2F9]">
              <div className="flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.375 1.45898L2.1875 4.37565V14.584C2.1875 14.9708 2.34115 15.3417 2.61464 15.6152C2.88813 15.8887 3.25906 16.0423 3.64583 16.0423H13.8542C14.2409 16.0423 14.6119 15.8887 14.8854 15.6152C15.1589 15.3417 15.3125 14.9708 15.3125 14.584V4.37565L13.125 1.45898H4.375Z"
                    stroke="#303632"
                    strokeWidth="1.45833"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.1875 4.375H15.3125"
                    stroke="#303632"
                    strokeWidth="1.45833"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6654 7.29102C11.6654 8.06456 11.3581 8.80643 10.8111 9.35341C10.2641 9.90039 9.52225 10.2077 8.7487 10.2077C7.97515 10.2077 7.23328 9.90039 6.6863 9.35341C6.13932 8.80643 5.83203 8.06456 5.83203 7.29102"
                    stroke="#303632"
                    strokeWidth="1.45833"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-sm font-exo font-semibold">{itemLabel}</p>
              </div>
              <button
                type="button"
                onClick={handleClearCart}
                disabled={isClearingCart || isCartLocked}
                className="text-[#FF5D7A] text-sm flex items-center gap-1 bg-[#F9F9F9] py-0.5 px-3 rounded-full disabled:text-[#FF5D7A]/50 disabled:cursor-not-allowed"
              >
                {isClearingCart ? (
                  <Loader2 className="w-[1em] h-[1em] animate-spin" />
                ) : (
                  <>
                    Clear <X className="w-[1em] h-[1em]" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        <div className="px-5 pb-5 space-y-3.5">
          {items.map((item) => {
            const productId = getCartProductId(item);

            return (
              <CartCard
                key={item._id}
                item={item}
                variant={variant}
                isUpdating={isCartLocked || isCartItemUpdating(productId)}
                onIncreaseQuantity={handleIncreaseQuantity}
                onReduceQuantity={handleReduceQuantity}
                onRemoveFromCart={handleRemoveFromCart}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartProductWrapper;
