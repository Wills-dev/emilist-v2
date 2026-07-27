"use client";

import { SubmitEvent } from "react";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea";

const CancelOrderModal = ({
  open,
  onClose,
  orderNumber,
  reason,
  setReason,
  onSubmit,
  isSubmitting,
  canSubmit,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  orderNumber: string;
  reason: string;
  setReason: (reason: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  canSubmit: boolean;
}) => (
  <ModalWrapper
    open={open}
    onClose={onClose}
    title="Cancel Order"
    className="max-w-md"
    headerClassName="border-b border-[#ECECEC] pb-4"
  >
    <form className="space-y-7 pt-2" onSubmit={onSubmit}>
      <div className="space-y-5">
        <p className="max-sm:text-sm text-[#667085]">
          Cancel order #{orderNumber.replace(/^#/, "")}?
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
          Submit
        </Button>
      </div>
    </form>
  </ModalWrapper>
);

export default CancelOrderModal;
