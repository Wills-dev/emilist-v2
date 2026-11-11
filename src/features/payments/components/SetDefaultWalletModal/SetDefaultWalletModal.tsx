"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

export default function SetDefaultWalletModal({ currency, isSubmitting, onConfirm, onClose }: {
  currency: string;
  isSubmitting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <ModalWrapper open title="Change default wallet?" description={`Make your ${currency} wallet the default? Your current default wallet will be replaced.`} onClose={(open) => { if (!open && !isSubmitting) onClose(); }} showCloseButton={!isSubmitting} className="max-w-md!">
      <div className="flex flex-col gap-3 pt-6 sm:flex-row">
        <Button variant="primary" className="w-full sm:order-2 sm:flex-1" loading={isSubmitting} disabled={isSubmitting} onClick={onConfirm}>Set as default</Button>
        <Button variant="default" className="w-full sm:order-1 sm:w-auto" disabled={isSubmitting} onClick={onClose}>Cancel</Button>
      </div>
    </ModalWrapper>
  );
}
