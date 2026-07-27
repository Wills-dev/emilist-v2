"use client";

import { ReviewModal } from "@/features/materials/components/MaterialReviewModal/MaterialReviewModal";
import { useRateMerchant } from "../../hooks/useRateMerchant";

const RateMerchantModal = ({
  merchantId,
  open,
  onClose,
}: {
  merchantId: string;
  open: boolean;
  onClose: (open: boolean) => void;
}) => {
  const form = useRateMerchant({
    merchantId,
    onSuccess: () => onClose(false),
  });

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      title="Rate Merchant"
      description="Share your experience with this merchant."
      submitLabel="Submit rating"
      form={form}
    />
  );
};

export default RateMerchantModal;
