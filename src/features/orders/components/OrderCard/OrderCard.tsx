"use client";

import Image from "next/image";

import { getCurrencySign } from "@/lib/helpers/currencySign";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import OrderCardActionBtns from "../OrderCardActionBtns/OrderCardActionBtns";
import OrderStatusUpdate from "../OrderStatusUpdate/OrderStatusUpdate";
import OrderInfoWrapper from "../OrderInfoWrapper/OrderInfoWrapper";
import MerchantsInfo from "../MerchantsInfo/MerchantsInfo";
import { displayOrderValue } from "../../helpers/orderDisplay";
import type { CustomerOrder } from "../../types/order";

const OrderCard = ({
  order,
  isLast = false,
}: {
  order: CustomerOrder;
  isLast?: boolean;
}) => {
  const primaryProduct = order.products[0];

  return (
    <div
      className={`w-full ${isLast ? "" : "border-b border-[#F1F2F9] pb-3.5"}`}
    >
      <div className="space-y-2 py-3.5">
        <div className="flex items-center gap-2.5 sm:gap-3.5 max-lg:border-b max-lg:border-[#F1F2F9] max-lg:pb-2">
          <div className="relative h-16 w-16.5 shrink-0 overflow-hidden rounded-[8.75px] bg-[#ECECF0] md:h-32.5 md:w-28">
            {primaryProduct?.thumbnail && (
              <Image
                src={primaryProduct.thumbnail}
                alt={primaryProduct.productName}
                fill
                sizes="(min-width: 768px) 112px, 66px"
                className="object-cover"
              />
            )}
          </div>
          <div className="w-full flex-1 space-y-2">
            <div className="flex w-full justify-between max-lg:flex-col lg:items-center">
              <p className="font-exo font-semibold max-sm:text-sm">
                Order #{displayOrderValue(order._id)}
              </p>
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs text-[#707471]">Total cost:</span>
                <span className="font-exo font-semibold max-sm:text-sm">
                  {Number.isFinite(order.totalAmount) ? `${getCurrencySign("NGN")}${numberWithCommas(order.totalAmount)}` : "N/A"}
                </span>
              </div>
            </div>
            <div className="max-lg:hidden">
              <OrderInfoWrapper order={order} />
            </div>
            {primaryProduct && (
              <div className="hidden justify-between gap-4 lg:flex lg:items-center">
                <MerchantsInfo product={primaryProduct} />
                <OrderCardActionBtns order={order} />
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <OrderCardActionBtns order={order} />
        </div>
        <div className="lg:hidden">
          <OrderInfoWrapper order={order} />
        </div>
        {primaryProduct && (
          <div className="lg:hidden">
            <MerchantsInfo product={primaryProduct} />
          </div>
        )}
        <OrderStatusUpdate status={order.deliveryStatus} updatedAt={order.deliveryStatusUpdatedAt} />
      </div>
    </div>
  );
};

export default OrderCard;
