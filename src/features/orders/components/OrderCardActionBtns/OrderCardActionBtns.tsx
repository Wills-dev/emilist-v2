"use client";

import { useState } from "react";

import ItemActionButton from "@/components/atoms/ItemActionButton/ItemActionButton";
import { ReviewModal } from "@/features/materials/components/MaterialReviewModal/MaterialReviewModal";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";
import ReturnItemModal from "../ReturnItemModal/ReturnItemModal";
import TrackOrderModal from "../TrackOrderModal/TrackOrderModal";
import { useCancelOrder } from "../../hooks/useCancelOrder";
import { useOrderActions } from "../../hooks/useOrderActions";
import { useReturnItem } from "../../hooks/useReturnItem";
import { useTrackOrder } from "../../hooks/useTrackOrder";
import type { CustomerOrder } from "../../types/order";

const OrderCardActionBtns = ({ order }: { order: CustomerOrder }) => {
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

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
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
        {actions.actions.canReturn && (
          <ItemActionButton
            title="Return Order"
            onClick={returnRequest.openModal}
            className="text-[#FF5D7A]"
          />
        )}
        {actions.actions.canReorder && (
          <ItemActionButton
            title="Reorder"
            onClick={() => actions.reorder()}
            disabled={actions.isReordering}
            className="text-[#6667FF]"
          />
        )}
        {actions.actions.canReview &&
          order.products.map((product) => (
            <ItemActionButton
              key={product.productId}
              title={`Review ${product.productName}`}
              onClick={() => openReview(product.productId)}
              className="text-[#6667FF]"
            />
          ))}
      </div>
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
        tracking={tracking.data}
        isLoading={tracking.isLoading}
        error={trackingError}
      />
      {reviewProductId && (
        <ReviewModal
          open={isReviewOpen}
          onClose={setIsReviewOpen}
          title="Review product"
          description="Share your experience with this product."
          submitLabel="Submit review"
          form={reviewForm}
        />
      )}
    </>
  );
};

export default OrderCardActionBtns;
