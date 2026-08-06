"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

interface DeactivateAccountModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
  isDeactivating: boolean;
}

const DeactivateAccountModal = ({
  open,
  onClose,
  onConfirm,
  isDeactivating,
}: DeactivateAccountModalProps) => (
  <ModalWrapper
    open={open}
    onClose={onClose}
    title="Deactivate Account"
    description="Are you sure you want to deactivate your account? You will be signed out and will no longer be able to use your account."
    className="max-w-md"
    headerClassName="border-b border-[#ECECEC] pb-4"
  >
    <div className="flex gap-3 pt-6">
      <Button
        variant="default"
        onClick={() => onClose(false)}
        disabled={isDeactivating}
        className="h-11 flex-1"
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={onConfirm}
        loading={isDeactivating}
        className="h-11 flex-1"
      >
        Deactivate
      </Button>
    </div>
  </ModalWrapper>
);

export default DeactivateAccountModal;
