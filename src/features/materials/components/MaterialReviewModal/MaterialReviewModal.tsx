"use client";

import { Star } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea";

import { useAddMaterialReview } from "../../hooks/useAddMaterialReview";

export interface ReviewModalFormProps {
  rating: number;
  comment: string;
  setRating: (rating: number) => void;
  setComment: (comment: string) => void;
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  isPending: boolean;
}

export const ReviewModal = ({
  open,
  onClose,
  title,
  description,
  form,
  submitLabel = "Submit review",
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  title: string;
  description: string;
  form: ReviewModalFormProps;
  submitLabel?: string;
}) => {
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) form.resetForm();
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
      <form className="space-y-6 pt-2" onSubmit={form.handleSubmit}>
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-[#303632]">
            Your rating
          </legend>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => form.setRating(value)}
                aria-label={`Rate ${value} out of 5`}
                className="text-[#B8B9B8] transition-colors hover:text-[#FF9933]"
              >
                <Star
                  className="size-7"
                  fill={value <= form.rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2 text-sm font-semibold text-[#303632]">
          Your review
          <Textarea
            value={form.comment}
            onChange={(event) => form.setComment(event.target.value)}
            placeholder="Tell others about your experience"
            rows={5}
            required
          />
        </label>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="default"
            className="h-11 flex-1"
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="h-11 flex-1"
            loading={form.isPending}
            disabled={!form.rating || !form.comment.trim()}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

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
  const form = useAddMaterialReview({
    productId,
    onSuccess: () => onClose(false),
  });

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      form={form}
    />
  );
};

export default MaterialReviewModal;
