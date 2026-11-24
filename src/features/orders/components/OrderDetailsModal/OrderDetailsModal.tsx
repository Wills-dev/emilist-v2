"use client";

import Image from "next/image";
import {
  MapPin,
  PackageCheck,
  ReceiptText,
  Truck,
} from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { getCurrencySign } from "@/lib/helpers/currencySign";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import { useGetOrder } from "../../hooks/useGetOrder";
import MerchantsInfo from "../MerchantsInfo/MerchantsInfo";
import type { CustomerOrder, OrderDeliveryStatus } from "../../types/order";

const deliveryLabels: Record<OrderDeliveryStatus, string> = {
  orderConfirmed: "Order confirmed",
  outForDelivery: "Out for delivery",
  delivered: "Delivered",
  canceled: "Canceled",
  returned: "Returned",
};

const formatDate = (date?: string | null) =>
  date ? new Date(date).toLocaleString() : "—";

const formatAmount = (amount: number) =>
  `${getCurrencySign("NGN")}${numberWithCommas(amount)}`;

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="space-y-1">
    <dt className="text-xs text-[#707471]">{label}</dt>
    <dd className="break-words text-sm font-medium text-[#303632]">{value}</dd>
  </div>
);

const SectionHeading = ({
  icon,
  title,
  trailing,
}: {
  icon: React.ReactNode;
  title: string;
  trailing?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-3">
    <h3 className="flex items-center gap-2 font-exo text-sm font-semibold text-[#303632]">
      <span className="text-[#18A154]">{icon}</span>
      {title}
    </h3>
    {trailing}
  </div>
);

const OrderDetailsSkeleton = () => (
  <div
    role="status"
    aria-label="Loading order details"
    aria-busy="true"
    className="space-y-5"
  >
    <div className="space-y-4 rounded-2xl bg-[#F0FDF5] p-5">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-40" />
      <div className="flex gap-2">
        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
    <div className="space-y-3 rounded-2xl border border-[#F1F2F9] p-4">
      <Skeleton className="h-5 w-32" />
      <div className="flex gap-3">
        <Skeleton className="size-16 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    </div>
    <div className="space-y-3 rounded-2xl border border-[#F1F2F9] p-4">
      <Skeleton className="h-5 w-36" />
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex justify-between gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  </div>
);

const OrderDetailsModal = ({
  orderId,
  open,
  onClose,
}: {
  orderId: string;
  open: boolean;
  onClose: (open: boolean) => void;
}) => {
  const query = useGetOrder(orderId, open);
  const order: CustomerOrder | undefined = query.data;
  const itemCount =
    order?.products.reduce((total, product) => total + product.quantity, 0) ?? 0;

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Order details"
      description="Your order summary and purchase information"
      className="max-w-2xl! w-full border-0 p-0"
      headerClassName="border-b border-[#F1F2F9] px-5 py-4 pr-12 sm:px-6"
      titleClassName="text-[#303632]"
      descClassName="text-xs text-[#707471]"
    >
      <div className="space-y-5 bg-[#FCFCFC] p-4 sm:p-6">
        {query.isLoading ? (
          <OrderDetailsSkeleton />
        ) : query.isError ? (
          <div
            role="alert"
            className="space-y-3 rounded-2xl border border-[#F1F2F9] bg-white p-6 text-center"
          >
            <p className="text-sm text-[#707471]">
              Unable to load this order right now.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mx-auto h-10"
              onClick={() => void query.refetch()}
            >
              Try again
            </Button>
          </div>
        ) : order ? (
          <>
            <section className="space-y-4 rounded-2xl border border-[#DDF7E8] bg-[#F0FDF5] p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#5E625F]">
                    Order placed {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 font-exo text-2xl font-bold text-[#1D2939]">
                    {formatAmount(order.totalAmount)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label={order.status} />
                  <StatusBadge
                    label={order.paymentStatus}
                    tone={order.paymentStatus === "paid" ? "success" : "warning"}
                  />
                  <StatusBadge
                    label={deliveryLabels[order.deliveryStatus]}
                    tone={
                      order.deliveryStatus === "delivered"
                        ? "success"
                        : order.deliveryStatus === "canceled" ||
                            order.deliveryStatus === "returned"
                          ? "danger"
                          : "neutral"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <IdentifierBadge
                  label="Order ID"
                  value={order._id}
                  maxWidth="max-w-full"
                />
                <IdentifierBadge
                  label="Cart ID"
                  value={order.cartId}
                  maxWidth="max-w-full"
                />
              </div>
              <p className="text-xs text-[#5E625F]">
                {itemCount} {itemCount === 1 ? "item" : "items"}
                {order.promoCodes.length > 0 &&
                  ` · Promo${order.promoCodes.length > 1 ? "s" : ""}: ${order.promoCodes.join(", ")}`}
              </p>
            </section>

            <section className="space-y-4 rounded-2xl border border-[#F1F2F9] bg-white p-4 sm:p-5">
              <SectionHeading
                icon={<PackageCheck size={18} />}
                title="Items in this order"
                trailing={
                  <span className="text-xs text-[#707471]">
                    {order.products.length}{" "}
                    {order.products.length === 1 ? "product" : "products"}
                  </span>
                }
              />
              <ul className="divide-y divide-[#F1F2F9]">
                {order.products.map((product) => (
                  <li
                    key={product._id ?? product.productId}
                    className="flex gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    {product.thumbnail ? (
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#F6F7F9]">
                        <Image
                          src={product.thumbnail}
                          alt={product.productName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#F0FDF5] text-[#18A154]">
                        <PackageCheck size={22} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-[#303632]">
                            {product.productName}
                          </p>
                          <p className="mt-1 text-xs text-[#707471]">
                            {[product.brand, product.categoryName]
                              .filter(Boolean)
                              .join(" · ") || "Material"}
                          </p>
                        </div>
                        <p className="text-xs font-medium text-[#303632]">
                          {formatAmount(product.price)} each
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-[#707471]">
                        Qty {product.quantity}
                        {product.quantityMetric
                          ? ` ${product.quantityMetric}`
                          : ""}{" "}
                        · {formatAmount(product.price)} each
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <MerchantsInfo product={product} />
                        {product.promoCode && (
                          <span className="rounded-full bg-[#FFF6E8] px-2.5 py-1 text-[11px] font-medium text-[#A95B00]">
                            {product.promoCode}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <IdentifierBadge
                          label="Product"
                          value={product.productId}
                          maxWidth="max-w-full"
                        />
                        <IdentifierBadge
                          label="Seller"
                          value={product.merchantId}
                          maxWidth="max-w-full"
                        />
                        {product._id && (
                          <IdentifierBadge
                            label="Order item"
                            value={product._id}
                            maxWidth="max-w-full"
                          />
                        )}
                      </div>
                      {(product.discountAmount > 0 || product.taxAmount > 0) && (
                        <p className="mt-2 text-xs text-[#707471]">
                          {product.discountAmount > 0 &&
                            `Discount ${formatAmount(product.discountAmount)}`}
                          {product.discountAmount > 0 &&
                            product.taxAmount > 0 &&
                            " · "}
                          {product.taxAmount > 0 &&
                            `Tax ${formatAmount(product.taxAmount)} (${product.taxPercentage}%)`}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4 rounded-2xl border border-[#F1F2F9] bg-white p-4 sm:p-5">
              <SectionHeading
                icon={<ReceiptText size={18} />}
                title="Payment summary"
              />
              <dl className="space-y-3">
                {order.originalTotalAmount !== undefined && (
                  <div className="flex justify-between gap-4 text-sm">
                    <dt className="text-[#707471]">Original total</dt>
                    <dd className="text-[#303632]">
                      {formatAmount(order.originalTotalAmount)}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-[#707471]">Subtotal</dt>
                  <dd className="text-[#303632]">
                    {formatAmount(order.subtotalAmount)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-[#707471]">Discount</dt>
                  <dd className="text-[#18A154]">
                    −{formatAmount(order.discountAmount)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-[#707471]">Tax</dt>
                  <dd className="text-[#303632]">
                    {formatAmount(order.taxAmount)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-[#707471]">Shipping</dt>
                  <dd className="text-[#303632]">
                    {formatAmount(order.shippingAmount)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-dashed border-[#D9DED9] pt-3 font-semibold">
                  <dt className="text-[#303632]">Total paid</dt>
                  <dd className="text-[#1D2939]">
                    {formatAmount(order.totalAmount)}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="space-y-4 rounded-2xl border border-[#F1F2F9] bg-white p-4 sm:p-5">
              <SectionHeading
                icon={<MapPin size={18} />}
                title="Delivery information"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Shipping address"
                  value={order.shippingAddress || "No address provided"}
                />
                <Detail
                  label="Order note"
                  value={order.orderNote || "No note"}
                />
              </div>
              <div className="grid gap-4 border-t border-[#F1F2F9] pt-4 sm:grid-cols-2">
                <Detail
                  label="Discount applied"
                  value={order.discountApplied ? "Yes" : "No"}
                />
                <Detail label="Order status" value={order.status} />
                <Detail
                  label="Delivery status"
                  value={deliveryLabels[order.deliveryStatus]}
                />
                <Detail
                  label="Estimated delivery"
                  value={formatDate(order.deliveryDate)}
                />
                <Detail
                  label="Delivered at"
                  value={formatDate(order.deliveredAt)}
                />
                <Detail
                  label="Last updated"
                  value={formatDate(order.updatedAt)}
                />
              </div>
              {order.deliverySteps && order.deliverySteps.length > 0 && (
                <div className="border-t border-[#F1F2F9] pt-4">
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#303632]">
                    <Truck size={15} className="text-[#18A154]" />
                    Delivery updates
                  </h4>
                  <ol className="space-y-3 border-l-2 border-[#DDF7E8] pl-4">
                    {order.deliverySteps.map((step, index) => (
                      <li key={`${step.timestamp}-${step.status}-${index}`}>
                        <p className="text-sm font-medium text-[#303632]">
                          {deliveryLabels[step.status]}
                        </p>
                        {step.note && (
                          <p className="mt-0.5 text-xs text-[#707471]">
                            {step.note}
                          </p>
                        )}
                        <time className="mt-1 block text-[11px] text-[#8A8D8B]">
                          {formatDate(step.timestamp)}
                        </time>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {(order.cancellationReason || order.returnReason) && (
                <div className="space-y-3 border-t border-[#F1F2F9] pt-4">
                  {order.cancellationReason && (
                    <Detail
                      label="Cancellation reason"
                      value={order.cancellationReason}
                    />
                  )}
                  {order.returnReason && (
                    <Detail label="Return reason" value={order.returnReason} />
                  )}
                </div>
              )}
            </section>

          </>
        ) : null}
        <Button
          type="button"
          variant="default"
          className="h-11 w-full"
          onClick={() => onClose(false)}
        >
          Close
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default OrderDetailsModal;
