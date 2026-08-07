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
      <span className="mb-2 flex size-14 items-center justify-center rounded-full bg-[#FFF8E7]">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#FFF0C7] text-[#FF922E]">
          <AlertTriangle className="size-6" strokeWidth={1.8} />
        </span>
      </span>
    }
    className="max-w-[444px]! rounded-2xl p-6 sm:p-7"
    headerClassName="gap-1 text-left"
    titleClassName="text-[22px]! text-[#454A47]"
    descClassName="text-base! text-[#667085]!"
  >
    <div className="mt-6 flex gap-3">
      <Button
        variant="default"
        className="h-12 flex-1 text-base"
        disabled={loading}
        onClick={() => onClose(false)}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className="h-12 flex-1 text-base"
        loading={loading}
        onClick={onConfirm}
      >
        Log out
      </Button>
    </div>
  </ModalWrapper>
);

export default LogoutConfirmModal;
