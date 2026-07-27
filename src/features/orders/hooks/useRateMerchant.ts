"use client";

import { SubmitEvent, useState } from "react";

export const useRateMerchant = ({
  merchantId,
  onRateMerchant,
  onSuccess,
}: {
  merchantId: string;
  onRateMerchant?: (payload: {
    merchantId: string;
    rating: number;
    comment: string;
  }) => Promise<void>;
  onSuccess?: () => void;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(false);

  const resetForm = () => {
    setRating(0);
    setComment("");
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || !comment.trim() || !onRateMerchant) return;

    setIsPending(true);
    try {
      await onRateMerchant({
        merchantId,
        rating,
        comment: comment.trim(),
      });
      resetForm();
      onSuccess?.();
    } finally {
      setIsPending(false);
    }
  };

  return {
    rating,
    comment,
    setRating,
    setComment,
    handleSubmit,
    resetForm,
    isPending,
  };
};
