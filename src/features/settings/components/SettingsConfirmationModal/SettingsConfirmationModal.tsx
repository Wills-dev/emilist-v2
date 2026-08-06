"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

interface SettingsConfirmationModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  title: string;
  message: string;
  onConfirm: () => void;
  loading?: boolean;
}

const SettingsConfirmationModal = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  loading = false,
}: SettingsConfirmationModalProps) => (
  <ModalWrapper
    open={open}
    onClose={onClose}
    title={title}
    className="max-w-md!"
    headerClassName="border-b border-[#ECECEC] pb-5"
  >
    <p className="py-7 text-base leading-7 text-[#667085]">{message}</p>
    <div className="flex gap-3">
      <Button
        variant="default"
        className="h-11 flex-1"
        disabled={loading}
        onClick={() => onClose(false)}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className="h-11 flex-1"
        loading={loading}
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </div>
  </ModalWrapper>
);

export default SettingsConfirmationModal;
