"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { OrderTrackingStatus } from "../../hooks/useTrackOrder";

interface TrackingStep {
  key: OrderTrackingStatus;
  label: string;
  date: string;
}

const statusMessages: Record<OrderTrackingStatus, (order: string) => string> = {
  confirmed: (order) =>
    `Your Order #${order} has been confirmed by the merchant`,
  out_for_delivery: (order) =>
    `Your Order #${order} has been shipped out for delivery by the merchant, you will be notified once your order arrives.`,
  delivered: (order) => `Your Order #${order} has been delivered successfully`,
};

const TrackOrderModal = ({
  open,
  onClose,
  orderNumber,
  status,
  confirmedDate,
  deliveryDate,
  expectedDeliveryDate,
  onCancelOrder,
  onReturnItem,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  orderNumber: string;
  status: OrderTrackingStatus;
  confirmedDate: string;
  deliveryDate: string;
  expectedDeliveryDate: string;
  onCancelOrder: () => void;
  onReturnItem: () => void;
}) => {
  const normalizedOrderNumber = orderNumber.replace(/^#/, "");
  const steps: TrackingStep[] = [
    {
      key: "confirmed",
      label: "Order Confirmed",
      date: confirmedDate,
    },
    {
      key: "out_for_delivery",
      label: "Out For Delivery",
      date: deliveryDate,
    },
    {
      key: "delivered",
      label: "Delivered",
      date:
        status === "delivered"
          ? expectedDeliveryDate
          : `Expected on ${expectedDeliveryDate}`,
    },
  ];

  const getActiveStyles = (step: OrderTrackingStatus) => {
    if (step !== status) {
      return {
        title: "text-[#A3A7A4]",
        date: "text-[#C9CCC9]",
        dot: "bg-[#909592]",
        mobileCard: "bg-white",
      };
    }

    if (status === "out_for_delivery") {
      return {
        title: "text-[#FF8A1F]",
        date: "text-[#FF8A1F]",
        dot: "bg-[#FF9933]",
        mobileCard: "bg-[#FFFDF0]",
      };
    }

    return {
      title: "text-[#00B950]",
      date: "text-[#00B950]",
      dot: "bg-[#25C269]",
      mobileCard: "bg-[#FBFFF8]",
    };
  };

  const handlePrimaryAction = () => {
    onClose(false);
    if (status === "delivered") {
      onReturnItem();
    } else {
      onCancelOrder();
    }
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Track Order"
      className="max-w-4xl! w-full"
      headerClassName="border-b border-[#ECECEC] pb-4"
    >
      <div className="space-y-7 pt-2">
        <p className="max-w-3xl text-base leading-7 text-[#667085]">
          {statusMessages[status](normalizedOrderNumber)}
        </p>

        <div className="rounded-[10px] bg-[#FCFCFC] p-2 md:px-8 md:py-7">
          <div className="relative hidden grid-cols-3 md:grid">
            <div className="absolute left-[16.66%] right-[16.66%] top-11 h-1 rounded-full bg-[#ECECEC]" />
            {steps.map((step) => {
              const styles = getActiveStyles(step.key);
              return (
                <div
                  key={step.key}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <p className={`text-lg font-medium ${styles.title}`}>
                    {step.label}
                  </p>
                  <span
                    className={`mt-2 block h-5 w-9 rounded-full ${styles.dot}`}
                  />
                  <p className={`mt-2 text-xs ${styles.date}`}>{step.date}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-0 md:hidden">
            {steps.map((step, index) => {
              const styles = getActiveStyles(step.key);
              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div
                    className={`w-full rounded-[8px] px-3 py-3 text-center ${styles.mobileCard}`}
                  >
                    <p className={`text-sm font-medium ${styles.title}`}>
                      {step.label}
                    </p>
                    <p className={`mt-2 text-xs ${styles.date}`}>{step.date}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-7 border-l-4 border-dotted border-[#D9D9D9]" />
                  )}
                </div>
              );
            })}
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
            variant="danger"
            className="h-11 flex-1"
            onClick={handlePrimaryAction}
          >
            {status === "delivered" ? "Return Item" : "Cancel Order"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TrackOrderModal;
