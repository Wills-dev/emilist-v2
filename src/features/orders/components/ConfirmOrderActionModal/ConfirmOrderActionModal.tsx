"use client";
import { useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

export default function ConfirmOrderActionModal({ open, onClose, title, description, confirmLabel = "Confirm", onConfirm, disabled = false }: {
  open: boolean; onClose: (open: boolean) => void; title: string; description: string;
  confirmLabel?: string; onConfirm: () => Promise<unknown>; disabled?: boolean;
}) {
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const close = (value: boolean) => { if (!pending.current) onClose(value); };
  const confirm = async () => {
    if (pending.current || disabled) return;
    pending.current = true; setBusy(true);
    try { await onConfirm(); onClose(false); } catch { /* The mutation displays the API error and leaves this modal open. */ }
    finally { pending.current = false; setBusy(false); }
  };
  return <ModalWrapper open={open} onClose={close} title={title} className="max-w-md" showCloseButton={!busy}>
    <div className="space-y-6 pt-4"><p className="text-sm text-[#667085]">{description}</p><div className="flex gap-3">
      <Button type="button" variant="default" className="h-11 flex-1" disabled={busy} onClick={() => close(false)}>Cancel</Button>
      <Button type="button" variant="primary" className="h-11 flex-1" loading={busy} disabled={busy || disabled} onClick={() => void confirm()}>{confirmLabel}</Button>
    </div></div>
  </ModalWrapper>;
}
