import { SubmitEvent, useState } from "react";

export const useCancelOrder = ({
  orderId,
  onCancelOrder,
}: {
  orderId: string;
  onCancelOrder?: (payload: {
    orderId: string;
    reason: string;
  }) => Promise<void>;
}) => {
  const [reason, setReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => setReason("");
  const openModal = () => setIsOpen(true);

  const handleModalChange = (open: boolean) => {
    if (!open) resetForm();
    setIsOpen(open);
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedReason = reason.trim();

    if (!normalizedReason || !onCancelOrder) return;

    setIsSubmitting(true);
    try {
      await onCancelOrder({ orderId, reason: normalizedReason });
      resetForm();
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    reason,
    setReason,
    isOpen,
    isSubmitting,
    openModal,
    handleModalChange,
    handleSubmit,
    canSubmit: Boolean(reason.trim()),
  };
};
