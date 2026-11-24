"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

import ItemActionButton from "@/components/atoms/ItemActionButton/ItemActionButton";
import MessageButton from "@/features/messages/components/MessageButton/MessageButton";
import { ReviewModal } from "@/features/materials/components/MaterialReviewModal/MaterialReviewModal";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";
import ConfirmOrderActionModal from "../ConfirmOrderActionModal/ConfirmOrderActionModal";
import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";
import ReturnItemModal from "../ReturnItemModal/ReturnItemModal";
import TrackOrderModal from "../TrackOrderModal/TrackOrderModal";
import { useCancelOrder } from "../../hooks/useCancelOrder";
import { useOrderActions } from "../../hooks/useOrderActions";
import { useReturnItem } from "../../hooks/useReturnItem";
import { useTrackOrder } from "../../hooks/useTrackOrder";
import type { CustomerOrder } from "../../types/order";

const OrderCardActionBtns = ({ order }: { order: CustomerOrder }) => {
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewProductId, setReviewProductId] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const actions = useOrderActions(order);
  const tracking = useTrackOrder(order._id);

  const cancel = useCancelOrder({
    orderId: order._id,
    onCancelOrder: async ({ reason }) => {
      await actions.cancel(reason);
    },
  });
  const returnRequest = useReturnItem({
    orderId: order._id,
    onReturnItem: async ({ reason }) => {
      await actions.returnOrder(reason);
    },
  });

  const openReview = (productId: string) => {
    setReviewProductId(productId);
    setIsReviewOpen(true);
  };

  const submitReview = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reviewProductId || !rating || !comment.trim()) return;

    try {
      await actions.rateProduct({
        productId: reviewProductId,
        rating,
        comment: comment.trim(),
      });
      setRating(0);
      setComment("");
      setIsReviewOpen(false);
    } catch {
      return;
    }
  };

  const reviewForm = {
    rating,
    comment,
    setRating,
    setComment,
    handleSubmit: submitReview,
    resetForm: () => {
      setRating(0);
      setComment("");
      setReviewProductId("");
    },
    isPending: actions.isRating,
  };

  const trackingError =
    tracking.error instanceof Error ? tracking.error.message : undefined;
  const trackingData = tracking.data && {
    ...tracking.data,
    deliveryStatusUpdatedAt: tracking.data.deliveryStatusUpdatedAt ?? (
      tracking.data.deliveryStatus === order.deliveryStatus ? order.deliveryStatusUpdatedAt : undefined
    ),
  };
  const sellers = [
    ...new Map(
      order.products.map((product) => [
        product.merchantId,
        { userId: product.merchantId, name: product.merchantName },
      ]),
    ).values(),
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <ItemActionButton
          title="View Order"
          icon={<Eye size={14} />}
          onClick={() => setIsDetailsOpen(true)}
          className="text-[#25C269]"
        />
        {sellers.map((seller) => (
          <MessageButton
            key={seller.userId}
            recipient={seller}
            label={sellers.length > 1 ? `Contact Seller: ${seller.name}` : "Contact Seller"}
            showLabel
            className="inline-flex h-7 items-center justify-center rounded-[6.75px] bg-[#F6F7F9] px-2 text-[#6667FF] hover:bg-[#E1E4E2]"
          />
        ))}
        {actions.actions.canPay && (
          <>
            <ItemActionButton
              title="Pay by card"
              onClick={() => actions.pay("Card")}
              disabled={actions.isPaying}
              className="text-[#25C269]"
            />
            <ItemActionButton
              title="Pay with wallet"
              onClick={() => actions.pay("Wallet")}
              disabled={actions.isPaying}
              className="text-[#25C269]"
            />
          </>
        )}
        {actions.actions.canCancel && (
          <ItemActionButton
            title="Cancel Order"
            onClick={cancel.openModal}
            className="text-[#FF5D7A]"
          />
        )}
        {actions.actions.canTrack && (
          <ItemActionButton
            title="Track Order"
            onClick={tracking.openModal}
            className="text-[#6667FF]"
          />
        )}
        {actions.actions.canReceive && <ItemActionButton title="Confirm Package Received" onClick={() => setIsReceiveOpen(true)} className="text-[#18A154]" disabled={actions.isReceiving} />}
        {actions.actions.canReturn && (
          <ItemActionButton
            title="Return Item"
            onClick={returnRequest.openModal}
            className="text-[#FF5D7A]"
          />
        )}
        {actions.actions.canReorder && (
          <ItemActionButton
            title="Order Again"
            onClick={() => setIsReorderOpen(true)}
            disabled={actions.isReordering}
            className="text-[#6667FF]"
          />
        )}
        {actions.actions.canReview &&
          order.products.map((product) => (
            <ItemActionButton
              key={product.productId}
              title={order.products.length > 1 ? `Rate Merchant: ${product.merchantName}` : "Rate Merchant"}
              onClick={() => openReview(product.productId)}
              className="text-[#6667FF]"
            />
          ))}
      </div>
      <ConfirmOrderActionModal open={isReceiveOpen} onClose={setIsReceiveOpen} title="Confirm Package Received" description="Confirm that you have received this package. The order will be marked as received." onConfirm={() => actions.receive()} disabled={!actions.actions.canReceive} />
      <ConfirmOrderActionModal open={isReorderOpen} onClose={setIsReorderOpen} title="Order Again" description="Add this order’s items to your cart at current prices?" confirmLabel="Add to cart" onConfirm={() => actions.reorder()} disabled={!actions.actions.canReorder} />
      <CancelOrderModal
        open={cancel.isOpen}
        onClose={cancel.handleModalChange}
        orderNumber={order._id}
        reason={cancel.reason}
        setReason={cancel.setReason}
        onSubmit={cancel.handleSubmit}
        isSubmitting={actions.isCanceling || cancel.isSubmitting}
        canSubmit={cancel.canSubmit}
      />
      <OrderDetailsModal
        orderId={order._id}
        open={isDetailsOpen}
        onClose={setIsDetailsOpen}
      />
      <ReturnItemModal
        open={returnRequest.isOpen}
        onClose={returnRequest.handleModalChange}
        reason={returnRequest.reason}
        setReason={returnRequest.setReason}
        onSubmit={returnRequest.handleSubmit}
        isSubmitting={actions.isReturning || returnRequest.isSubmitting}
        canSubmit={returnRequest.canSubmit}
      />
      <TrackOrderModal
        open={tracking.isOpen}
        onClose={tracking.handleModalChange}
        orderNumber={order._id}
        tracking={trackingData}
        onCancel={actions.actions.canCancel ? () => { tracking.handleModalChange(false); cancel.openModal(); } : undefined}
        isLoading={tracking.isLoading}
        error={trackingError}
      />
      {reviewProductId && (
        <ReviewModal
          open={isReviewOpen}
          onClose={setIsReviewOpen}
          title="Rate Merchant"
          description="Share your experience with the merchant and this purchase."
          submitLabel="Submit review"
          form={reviewForm}
        />
      )}
    </>
  );
};

export default OrderCardActionBtns;
