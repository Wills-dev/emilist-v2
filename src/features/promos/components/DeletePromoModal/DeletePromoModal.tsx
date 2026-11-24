"use client";
import { useRef } from "react";
import { toast } from "sonner";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { usePromoMutations } from "../../hooks/useSellerPromos";
import type { SellerPromo } from "../../types";

export default function DeletePromoModal({ promo, onClose }: { promo: SellerPromo; onClose: () => void }) {
  const { remove } = usePromoMutations();
  const pending = useRef(false);
  const close = () => { if (!pending.current) onClose(); };
  const submit = async () => {
    if (pending.current) return;
    pending.current = true;
    try { await remove.mutateAsync(promo.id); toast.success("Promo deleted."); onClose(); } catch { /* Keep confirmation open on API failure. */ }
    finally { pending.current = false; }
  };
  return <ModalWrapper open onClose={close} title="Delete Promo" className="max-w-md" headerClassName="border-b border-[#ECECEC] pb-4" showCloseButton={!remove.isPending}>
    <div className="space-y-6 pt-4"><p className="text-sm leading-6 text-[#667085]">Permanently delete <strong>{promo.code}</strong> from all {promo.products.length} linked {promo.products.length === 1 ? "product" : "products"}? Existing orders will keep their recorded discounts.</p><p className="text-xs text-[#737774]">To pause this promo instead, disable it in Edit Promo.</p><div className="flex gap-3"><Button type="button" variant="default" className="h-11 flex-1" onClick={close} disabled={remove.isPending}>Cancel</Button><Button type="button" variant="danger" className="h-11 flex-1" loading={remove.isPending} onClick={() => void submit()}>Delete promo</Button></div></div>
  </ModalWrapper>;
}
