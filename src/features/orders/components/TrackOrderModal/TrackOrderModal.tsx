"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import type { OrderDeliveryStatus, OrderTracking } from "../../types/order";
import OrderTrackingTimeline from "../OrderTrackingTimeline/OrderTrackingTimeline";

const statusMessages: Record<OrderDeliveryStatus, string> = {
  orderConfirmed: "has been confirmed by the merchant.",
  outForDelivery: "has been shipped out for delivery by the merchant. You will be notified once your order arrives.",
  delivered: "has been delivered. Please confirm that you have received your package.",
  received: "has been received successfully.",
  canceled: "has been canceled.",
  returned: "has been returned.",
};

export default function TrackOrderModal({ open, onClose, orderNumber, tracking, isLoading, error, onCancel }: {
  open: boolean; onClose: (open: boolean) => void; orderNumber: string;
  tracking?: OrderTracking; isLoading: boolean; error?: string; onCancel?: () => void;
}) {
  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Track Order"
      className="w-[calc(100%-2rem)] max-w-[45.5rem]! gap-0 rounded-xl bg-white p-4 sm:p-5"
      titleClassName="text-base! text-[#474C48]"
      headerClassName="border-b border-[#ECECEC] pb-4 pr-7"
    >
      <div className="pt-4">
        <p className="mb-5 text-xs leading-5 text-[#667085] sm:text-sm">
          Your Order #{orderNumber.replace(/^#/, "") || "N/A"}{tracking ? ` ${statusMessages[tracking.deliveryStatus]}` : ""}
        </p>
        {isLoading && <p role="status" className="py-6 text-sm text-[#667085]">Loading tracking information…</p>}
        {error && <p role="alert" className="py-4 text-sm text-red-600">{error}</p>}
        {tracking && <OrderTrackingTimeline tracking={tracking} />}
        <div className="flex gap-3 pt-5 sm:pt-12">
          <Button type="button" variant="default" className="h-9 flex-1 rounded-md! bg-white! px-3! py-2! text-xs font-normal! text-[#1D2939]" onClick={() => onClose(false)}>Cancel</Button>
          {onCancel && tracking?.deliveryStatus === "orderConfirmed" && (
            <Button type="button" variant="danger" className="h-9 flex-1 rounded-md! px-3! py-2! text-xs font-normal!" onClick={onCancel}>Cancel Order</Button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}
