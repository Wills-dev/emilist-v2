"use client";

import Image from "next/image";

import Button from "@/components/atoms/Button/Button";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Price from "@/components/atoms/Price/Price";
import QuantityControl from "@/components/molecules/QuantityControl/QuantityControl";
import { OrderAgainProduct } from "../../hooks/useOrderAgain";

const OrderAgainModal = ({
  product,
  quantity,
  open,
  onClose,
  onIncrement,
  onDecrement,
  onPurchase,
  isSubmitting,
}: {
  product: OrderAgainProduct;
  quantity: number;
  open: boolean;
  onClose: (open: boolean) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onPurchase: () => void;
  isSubmitting: boolean;
}) => (
  <ModalWrapper
    open={open}
    onClose={onClose}
    title="Order Again"
    className="max-w-xl"
    headerClassName="border-b border-[#ECECEC] pb-4"
  >
    <div className="space-y-7 pt-4">
      <p className="border-b border-[#ECECEC] pb-6 text-[#667085] max-sm:text-sm">
        Do you want to order this product from the merchant again?
      </p>

      <div className="flex min-w-0 gap-3">
        <div className="relative sm:h-28 h-16 sm:w-28 w-16 shrink-0 overflow-hidden rounded-[10px] bg-[#ECECF0]">
          <Image
            src={product.image || "/assets/images/material.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap justify-between gap-2">
            <p className="min-w-0 font-exo font-semibold">{product.name}</p>
            <Price
              price={product.price}
              currency={product.currency}
              unit={product.unit}
              showFullPrice
            />
          </div>
          <div className="space-y-1">
            <InfoItem label="Brand:" value={product.brand} variant="sm" />
            <InfoItem label="Category:" value={product.category} variant="sm" />
          </div>
          <QuantityControl
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="default"
          className="h-11 flex-1"
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          className="h-11 flex-1"
          loading={isSubmitting}
          onClick={onPurchase}
        >
          Purchase
        </Button>
      </div>
    </div>
  </ModalWrapper>
);

export default OrderAgainModal;
