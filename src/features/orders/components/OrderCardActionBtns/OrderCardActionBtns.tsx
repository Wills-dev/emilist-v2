"use client";

import { useState } from "react";

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
import OrderAgainModal from "../OrderAgainModal/OrderAgainModal";
import RateMerchantModal from "../RateMerchantModal/RateMerchantModal";
import {
  OrderAgainProduct,
  useOrderAgain,
} from "../../hooks/useOrderAgain";

const OrderCardActionBtns = ({
  orderId,
  orderNumber,
  trackingStatus,
  product,
  merchantId,
}: {
  orderId: string;
  orderNumber: string;
  trackingStatus: OrderTrackingStatus;
  product: OrderAgainProduct;
  merchantId: string;
}) => {
  const [isRateMerchantOpen, setIsRateMerchantOpen] = useState(false);
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
  const orderAgain = useOrderAgain({ product });
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
        <ItemActionButton
          title="Rate Merchant"
          onClick={() => setIsRateMerchantOpen(true)}
        />
        {isDelivered && (
          <ItemActionButton
            title="Order Again"
            onClick={orderAgain.openModal}
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
      <OrderAgainModal
        product={product}
        quantity={orderAgain.quantity}
        open={orderAgain.isOpen}
        onClose={orderAgain.handleModalChange}
        onIncrement={orderAgain.increment}
        onDecrement={orderAgain.decrement}
        onPurchase={orderAgain.handlePurchase}
        isSubmitting={orderAgain.isSubmitting}
      />
      {isRateMerchantOpen && (
        <RateMerchantModal
          merchantId={merchantId}
          open={isRateMerchantOpen}
          onClose={setIsRateMerchantOpen}
        />
      )}
    </>
  );
};

export default OrderCardActionBtns;
