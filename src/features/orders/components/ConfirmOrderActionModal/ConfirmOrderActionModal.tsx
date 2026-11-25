"use client";
import { useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

export default function ConfirmOrderActionModal({ open, onClose, title, description, confirmLabel = "Confirm", onConfirm, disabled = false, requireDeliveryEvidence = false }: {
  open: boolean; onClose: (open: boolean) => void; title: string; description: string;
  confirmLabel?: string; onConfirm: (deliveryImage?: File) => Promise<unknown>; disabled?: boolean; requireDeliveryEvidence?: boolean;
}) {
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [deliveryImage, setDeliveryImage] = useState<File>();
  const close = (value: boolean) => { if (!pending.current) { setDeliveryImage(undefined); onClose(value); } };
  const confirm = async () => {
    if (pending.current || disabled || (requireDeliveryEvidence && !deliveryImage)) return;
    pending.current = true; setBusy(true);
    try { await onConfirm(deliveryImage); setDeliveryImage(undefined); onClose(false); } catch { /* The mutation displays the API error and leaves this modal open. */ }
    finally { pending.current = false; setBusy(false); }
  };
  return <ModalWrapper open={open} onClose={close} title={title} className="max-w-md" showCloseButton={!busy}>
    <div className="space-y-6 pt-4"><p className="text-sm text-[#667085]">{description}</p>
      {requireDeliveryEvidence && <label className="block space-y-2 text-sm text-[#474C48]">
        <span>Delivery evidence <span className="text-[#FF5D7A]">*</span></span>
        <span className="block text-xs text-[#737774]">Attach an image or file confirming delivery.</span>
        <input type="file" name="deliveryImage" required disabled={busy} onChange={(event) => setDeliveryImage(event.target.files?.[0])} className="block w-full rounded-lg border border-[#E4E7EC] p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#F6F7F9] file:px-3 file:py-2 file:text-[#474C48]" />
      </label>}
      <div className="flex gap-3">
      <Button type="button" variant="default" className="h-11 flex-1" disabled={busy} onClick={() => close(false)}>Cancel</Button>
      <Button type="button" variant="primary" className="h-11 flex-1" loading={busy} disabled={busy || disabled || (requireDeliveryEvidence && !deliveryImage)} onClick={() => void confirm()}>{confirmLabel}</Button>
    </div></div>
  </ModalWrapper>;
}
