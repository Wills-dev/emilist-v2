"use client";

import { AlertTriangle } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

interface LogoutConfirmModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

const LogoutConfirmModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
}: LogoutConfirmModalProps) => (
  <ModalWrapper
    open={open}
    onClose={(nextOpen) => {
      if (!loading) onClose(nextOpen);
    }}
    title="Log Out"
    description="Sign out of your dashboard"
    showCloseButton={false}
    headerIcon={
      <span className="mb-1 flex size-12 items-center justify-center rounded-full bg-[#FFF8E7]">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#FFF0C7] text-[#FF922E]">
          <AlertTriangle className="size-5" strokeWidth={1.8} />
        </span>
      </span>
    }
    className="max-w-[400px]! rounded-2xl p-5 sm:p-6"
    headerClassName="gap-1 text-left"
    titleClassName="text-xl! text-[#454A47]"
    descClassName="text-sm! text-[#667085]!"
  >
    <div className="mt-5 flex gap-3">
      <Button
        variant="default"
        className="h-11 flex-1 text-sm"
        disabled={loading}
        onClick={() => onClose(false)}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className="h-11 flex-1 text-sm"
        loading={loading}
        onClick={onConfirm}
      >
        Log out
      </Button>
    </div>
  </ModalWrapper>
);

export default LogoutConfirmModal;
