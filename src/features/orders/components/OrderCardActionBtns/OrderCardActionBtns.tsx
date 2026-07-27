"use client";

import ItemActionButton from "@/components/atoms/ItemActionButton/ItemActionButton";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";
import { useCancelOrder } from "../../hooks/useCancelOrder";
import ReturnItemModal from "../ReturnItemModal/ReturnItemModal";
import { useReturnItem } from "../../hooks/useReturnItem";
import TrackOrderModal from "../TrackOrderModal/TrackOrderModal";
import {
  OrderTrackingStatus,
  useTrackOrder,
} from "../../hooks/useTrackOrder";

const OrderCardActionBtns = ({
  orderId,
  orderNumber,
  trackingStatus,
}: {
  orderId: string;
  orderNumber: string;
  trackingStatus: OrderTrackingStatus;
}) => {
  const {
    reason,
    setReason,
    isOpen,
    isSubmitting,
    openModal,
    handleModalChange,
    handleSubmit,
    canSubmit,
  } = useCancelOrder({ orderId });
  const {
    reason: returnReason,
    setReason: setReturnReason,
    isOpen: isReturnModalOpen,
    isSubmitting: isReturning,
    openModal: openReturnModal,
    handleModalChange: handleReturnModalChange,
    handleSubmit: handleReturnSubmit,
    canSubmit: canSubmitReturn,
  } = useReturnItem({ orderId });
  const {
    isOpen: isTrackModalOpen,
    openModal: openTrackModal,
    handleModalChange: handleTrackModalChange,
  } = useTrackOrder();
  const isDelivered = trackingStatus === "delivered";

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {!isDelivered && (
          <ItemActionButton title="Cancel Order" onClick={openModal} />
        )}
        {isDelivered && (
          <ItemActionButton title="Return Item" onClick={openReturnModal} />
        )}
        {!isDelivered && (
          <ItemActionButton
            title="Track Order"
            onClick={openTrackModal}
            className="text-[#6667FF]"
          />
        )}
        <ItemActionButton title="Rate Merchant" onClick={() => {}} />
        {isDelivered && (
          <ItemActionButton
            title="Order Again"
            onClick={() => {}}
            className="text-[#6667FF]"
          />
        )}
      </div>
      <CancelOrderModal
        open={isOpen}
        onClose={handleModalChange}
        orderNumber={orderNumber}
        reason={reason}
        setReason={setReason}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        canSubmit={canSubmit}
      />
      <ReturnItemModal
        open={isReturnModalOpen}
        onClose={handleReturnModalChange}
        reason={returnReason}
        setReason={setReturnReason}
        onSubmit={handleReturnSubmit}
        isSubmitting={isReturning}
        canSubmit={canSubmitReturn}
      />
      <TrackOrderModal
        open={isTrackModalOpen}
        onClose={handleTrackModalChange}
        orderNumber={orderNumber}
        status={trackingStatus}
        confirmedDate="February 16, 2026"
        deliveryDate="February 18, 2026"
        expectedDeliveryDate="February 19, 2026"
        onCancelOrder={openModal}
        onReturnItem={openReturnModal}
      />
    </>
  );
};

export default OrderCardActionBtns;
