"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import type { OrderTracking } from "../../types/order";

const statusLabels: Record<OrderTracking["deliveryStatus"], string> = {
  orderConfirmed: "Order confirmed",
  outForDelivery: "Out for delivery",
  delivered: "Delivered",
  canceled: "Canceled",
  returned: "Returned",
};

const TrackOrderModal = ({
  open,
  onClose,
  orderNumber,
  tracking,
  isLoading,
  error,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  orderNumber: string;
  tracking?: OrderTracking;
  isLoading: boolean;
  error?: string;
}) => (
  <ModalWrapper
    open={open}
    onClose={onClose}
    title="Track Order"
    className="max-w-2xl! w-full"
    headerClassName="border-b border-[#ECECEC] pb-4"
  >
    <div className="space-y-5 pt-2">
      <p className="text-sm text-[#667085]">
        Order #{orderNumber.replace(/^#/, "")}
      </p>
      {isLoading && <p role="status">Loading tracking information…</p>}
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      {tracking && (
        <>
          <p className="font-medium">
            Current status: {statusLabels[tracking.deliveryStatus]}
          </p>
          {tracking.deliveryDate && (
            <p className="text-sm text-[#667085]">
              Delivery date: {new Date(tracking.deliveryDate).toLocaleString()}
            </p>
          )}
          {tracking.timeline.length > 0 ? (
            <ol className="space-y-3 border-l-2 border-[#DDF7E8] pl-4">
              {tracking.timeline.map((step, index) => (
                <li key={`${step.timestamp}-${step.status}-${index}`}>
                  <p className="font-medium">
                    {statusLabels[step.status]}
                  </p>
                  {step.note && (
                    <p className="text-sm text-[#667085]">{step.note}</p>
                  )}
                  <time className="text-xs text-[#8A8D8B]">
                    {new Date(step.timestamp).toLocaleString()}
                  </time>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-[#667085]">No tracking updates yet.</p>
          )}
        </>
      )}
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

export default TrackOrderModal;
