"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

export default function JobPlaybackConfirmation({ action, jobTitle, busy, onConfirm, onClose }: {
  action: "pause" | "resume";
  jobTitle: string;
  busy: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const title = action === "pause" ? "Pause Job" : "Resume Job";
  return <ModalWrapper open title={title} description={`Do you want to ${action} “${jobTitle}”?`} onClose={(open) => { if (!open && !busy) onClose(); }} showCloseButton={!busy} className="max-w-md!">
    <div className="flex flex-col gap-3 pt-5 sm:flex-row">
      <Button variant="primary" className="w-full sm:order-2 sm:flex-1" loading={busy} disabled={busy} onClick={onConfirm}>{title}</Button>
      <Button variant="default" className="w-full sm:order-1 sm:w-auto" disabled={busy} onClick={onClose}>Cancel</Button>
    </div>
  </ModalWrapper>;
}
