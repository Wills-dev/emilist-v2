"use client";

import Image from "next/image";
import { memo } from "react";

import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import QuantityControl from "@/components/molecules/QuantityControl/QuantityControl";
import { getCurrencySign } from "@/lib/helpers/currencySign";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import { pluralizeQuantityMetric } from "@/lib/helpers/pluralizeQuantityMetric";
import { CartItem } from "../../types";
import {
  getCartProduct,
  getCartProductCategory,
  getCartProductId,
  getCartProductImage,
} from "../../helpers/cart";

const CartCard = ({
  item,
  variant,
  isUpdating,
  onIncreaseQuantity,
  onReduceQuantity,
  onRemoveFromCart,
}: {
  item: CartItem;
  variant: "primary" | "secondary";
  isUpdating: boolean;
  onIncreaseQuantity: (productId: string) => void;
  onReduceQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
}) => {
  const product = getCartProduct(item);
  const productId = getCartProductId(item);
  const productImage = getCartProductImage(product?.images);
  const currency = product?.currency ?? "NGN";
  const quantityMetric = product?.quantityMetric
    ? pluralizeQuantityMetric(item.quantity, product.quantityMetric)
    : "items";

  return (
    <div className="py-3.5 border-b border-[#F1F2F9]">
      <div className="py-3.5 flex md:items-center max-md:flex-col gap-3.5">
        <div
          className={`bg-[#ECECF0] overflow-hidden ${variant === "primary" ? "sm:w-28 w-18 sm:h-28 h-18 rounded-[8.75px]" : "w-14 h-14 rounded-[4.38px]"}`}
        >
          <Image
            src={productImage ?? "/assets/dummyImages/dummy-image.svg"}
            alt={product?.name ?? "Cart item"}
            width={118}
            height={118}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 w-full space-y-3.5">
          <div className="flex justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h6 className="font-exo font-semibold text-sm">
                {product?.name ?? "Unavailable product"}
              </h6>
              <div className="">
                <div className="max-w-141.75 w-full flex flex-wrap gap-3.5">
                  <InfoItem
                    label="Brand:"
                    value={product?.brand ?? "—"}
                    variant="xs"
                    className="text-[#474C48] font-medium"
                    labelClass="text-[#707471] font-normal"
                  />
                  <InfoItem
                    label="Category:"
                    value={getCartProductCategory(product?.category) ?? "—"}
                    variant="xs"
                    className="text-[#474C48] font-medium"
                    labelClass="text-[#707471] font-normal"
                  />
                </div>
                <p className="text-xs text-[#737774]">
                  {product?.merchantName ?? `${item.quantity} ${quantityMetric}`}
                </p>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs text-[#737774]">
                {getCurrencySign(currency)}{numberWithCommas(item.price)}
                {product?.quantityMetric ? `/${product.quantityMetric}` : ""}
              </p>
              <p className="text-sm font-medium">
                Total: {getCurrencySign(currency)}{numberWithCommas(item.lineTotal)}
              </p>
            </div>
          </div>
          {variant === "primary" && (
            <div className="flex justify-between flex-wrap gap-4">
              <QuantityControl
                quantity={item.quantity}
                onIncrement={() => onIncreaseQuantity(productId)}
                onDecrement={() => onReduceQuantity(productId, item.quantity)}
                disabled={isUpdating}
              />
              <button
                type="button"
                onClick={() => onRemoveFromCart(productId)}
                disabled={isUpdating}
                className="flex items-center gap-1 px-[8.75px] text-[#FF5D7A] text-xs font-medium disabled:text-[#FF5D7A]/50 disabled:cursor-not-allowed"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[1em] h-[1em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </span>
                <span className="text-center">Remove</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CartCard);
