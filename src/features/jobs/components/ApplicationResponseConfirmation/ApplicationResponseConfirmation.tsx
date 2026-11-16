"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

export default function ApplicationResponseConfirmation({ action, applicantName, onConfirm, onClose, busy = false, disabled = false }: {
  action: "accept" | "reject";
  applicantName: string;
  onConfirm: () => void;
  onClose: () => void;
  busy?: boolean;
  disabled?: boolean;
}) {
  const accepting = action === "accept";
  const title = accepting ? "Accept Application" : "Reject Application";
  return <ModalWrapper open title={title} description={`Do you want to ${action} ${applicantName}’s application for this job?`} onClose={(open) => { if (!open && !busy) onClose(); }} showCloseButton={!busy} className="max-w-md!">
    <div className="flex flex-col gap-3 pt-5 sm:flex-row">
      <Button variant={accepting ? "primary" : "danger"} className="w-full sm:order-2 sm:flex-1" loading={busy} disabled={busy || disabled} onClick={onConfirm}>{title}</Button>
      <Button variant="default" className="w-full sm:order-1 sm:w-auto" disabled={busy} onClick={onClose}>Cancel</Button>
    </div>
  </ModalWrapper>;
}
