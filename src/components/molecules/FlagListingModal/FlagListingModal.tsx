"use client";

import { SubmitEvent } from "react";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea";

const FlagListingModal = ({
  open,
  onClose,
  reason,
  setReason,
  onSubmit,
  isSubmitting = false,
  title = "Flag listing",
  description = "Do you want to report this product listing?",
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  reason: string;
  setReason: (reason: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  title?: string;
  description?: string;
}) => {
  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      className="max-w-md"
      headerClassName="border-b border-[#ECECEC] pb-4"
    >
      <form className="space-y-6 pt-6" onSubmit={onSubmit}>
        <label className="block space-y-2 text-sm font-semibold text-[#303632]">
          Reason for reporting
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Tell us why you are reporting this listing"
            rows={5}
            required
          />
        </label>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="default"
            className="h-11 flex-1"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="danger"
            className="h-11 flex-1"
            loading={isSubmitting}
            disabled={!reason.trim()}
          >
            Submit report
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default FlagListingModal;
