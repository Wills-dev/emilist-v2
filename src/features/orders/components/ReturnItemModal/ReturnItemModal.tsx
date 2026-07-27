"use client";

import { SubmitEvent } from "react";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea";

const ReturnItemModal = ({
  open,
  onClose,
  reason,
  setReason,
  onSubmit,
  isSubmitting,
  canSubmit,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  reason: string;
  setReason: (reason: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  canSubmit: boolean;
}) => (
  <ModalWrapper
    open={open}
    onClose={onClose}
    title="Return Item"
    className="max-w-md"
    headerClassName="border-b border-[#ECECEC] pb-4"
  >
    <form className="space-y-7 pt-2" onSubmit={onSubmit}>
      <div className="space-y-5">
        <p className="text-base text-[#667085]">
          Return this product back to the merchant
        </p>
        <Textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Please tell us why"
          className="min-h-43 resize-none bg-[#ECECEC]"
          required
        />
      </div>

      <div className="flex gap-3 pt-2">
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
          disabled={!canSubmit}
        >
          Return
        </Button>
      </div>
    </form>
  </ModalWrapper>
);

export default ReturnItemModal;
