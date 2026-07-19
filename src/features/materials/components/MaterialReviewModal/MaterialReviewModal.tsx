"use client";

import { Star } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea";

import { useAddMaterialReview } from "../../hooks/useAddMaterialReview";

const MaterialReviewModal = ({
  productId,
  open,
  onClose,
  title = "Write a review",
  description = "Share your experience with this material.",
}: {
  productId: string;
  open: boolean;
  onClose: (open: boolean) => void;
  title?: string;
  description?: string;
}) => {
  const {
    rating,
    comment,
    setRating,
    setComment,
    handleSubmit,
    resetForm,
    isPending,
  } = useAddMaterialReview({
    productId,
    onSuccess: () => onClose(false),
  });

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    onClose(isOpen);
  };

  return (
    <ModalWrapper
      open={open}
      onClose={handleClose}
      title={title}
      description={description}
      className="max-w-md"
    >
      <form className="space-y-6 pt-2" onSubmit={handleSubmit}>
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-[#303632]">
            Your rating
          </legend>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`Rate ${value} out of 5`}
                className="text-[#B8B9B8] transition-colors hover:text-[#FF9933]"
              >
                <Star
                  className="size-7"
                  fill={value <= rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2 text-sm font-semibold text-[#303632]">
          Your review
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Tell others about your experience"
            rows={5}
            required
          />
        </label>

        <Button
          type="submit"
          variant="primary"
          className="h-11 w-full"
          loading={isPending}
          disabled={!rating || !comment.trim()}
        >
          Submit review
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default MaterialReviewModal;
