"use client";
import { useRef, useState, type SubmitEvent } from "react";
import { toast } from "sonner";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import CopyReferenceButton from "@/components/atoms/CopyReferenceButton/CopyReferenceButton";
import { buildPromoPayload, initialPromoForm } from "../../helpers/promoForm";
import { usePromoMutations } from "../../hooks/useSellerPromos";
import type { CreatePromoPayload, PromoFormValues, PromoProduct, SellerPromo, UpdatePromoPayload } from "../../types";
import PromoProductPicker from "../PromoProductPicker/PromoProductPicker";

export default function PromoFormModal({ product, promo, onClose }: { product: PromoProduct; promo?: SellerPromo; onClose: () => void }) {
  const [form, setForm] = useState(() => initialPromoForm(product.id, promo));
  const [created, setCreated] = useState<SellerPromo | null>(null);
  const pending = useRef(false);
  const mutations = usePromoMutations();
  const busy = mutations.create.isPending || mutations.update.isPending;
  const set = <K extends keyof PromoFormValues>(key: K, value: PromoFormValues[K]) => setForm((current) => ({ ...current, [key]: value }));
  const close = () => { if (!pending.current) onClose(); };
  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;
    let payload: CreatePromoPayload | UpdatePromoPayload;
    try { payload = buildPromoPayload(form, promo); } catch (error) { toast.error((error as Error).message); return; }
    pending.current = true;
    try {
      if (promo) { await mutations.update.mutateAsync({ id: promo.id, payload: payload as UpdatePromoPayload }); toast.success("Promo updated."); onClose(); }
      else { const result = await mutations.create.mutateAsync(payload as CreatePromoPayload); setCreated(result); toast.success("Promo created."); }
    } catch { /* The mutation displays server validation errors without closing the form. */ }
    finally { pending.current = false; }
  };
  return <ModalWrapper open onClose={close} title={created ? "Promo Created" : promo ? "Edit Promo" : "Create Promo"} className="max-w-xl!" headerClassName="border-b border-[#ECECEC] pb-4" showCloseButton={!busy}>
    {created ? <div className="space-y-6 pt-4"><p className="text-sm text-[#667085]">Share this code with customers to give {created.discountPercentage}% off the selected products.</p><div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#F6F7F9] p-4"><strong className="font-exo text-lg text-[#474C48]">{created.code}</strong><CopyReferenceButton value={created.code} label="Copy promo code" /></div><Button type="button" variant="primary" className="h-11 w-full" onClick={close}>Done</Button></div> : <form onSubmit={submit} className="space-y-6 pt-4">
      {promo && <p className="text-xs leading-5 text-[#737774]">Changes to this promo apply to every selected product.</p>}
      <fieldset disabled={busy} className="space-y-5">
        <label className="block space-y-2 text-sm text-[#474C48]">Promo code {promo ? "" : "(optional)"}<Input value={form.code} onChange={(event) => set("code", event.target.value.toUpperCase())} disabled={Boolean(promo)} maxLength={20} placeholder="e.g. SAVE20" /><span className="block text-xs text-[#737774]">{promo ? "The code cannot be changed." : "Leave empty to generate a code. Use 3–20 letters and numbers."}</span></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm text-[#474C48]">Discount (%)<Input type="number" required min={1} max={100} step="any" value={form.discountPercentage} onChange={(event) => set("discountPercentage", event.target.value)} placeholder="20" /></label><label className="space-y-2 text-sm text-[#474C48]">Expires at (WAT)<Input type="datetime-local" required value={form.expiryDate} onChange={(event) => set("expiryDate", event.target.value)} /></label></div>
        <PromoProductPicker initialProducts={[...(promo?.products ?? []), product]} selected={form.productIds} onChange={(ids) => set("productIds", ids)} />
        <label className="flex items-start gap-3 text-sm text-[#474C48]"><input type="checkbox" checked={form.isSingleUse} onChange={(event) => set("isSingleUse", event.target.checked)} disabled={Boolean(promo)} className="mt-0.5 size-4 shrink-0 accent-[#25C269]" /><span>Single-use promo<span className="mt-1 block text-xs text-[#737774]">Disabled after the first completed checkout across all customers.{promo ? " This cannot be changed after creation." : ""}</span></span></label>
        {promo && <label className="flex items-center gap-3 text-sm text-[#474C48]"><input type="checkbox" checked={form.isActive} onChange={(event) => set("isActive", event.target.checked)} className="size-4 accent-[#25C269]" />Promo enabled</label>}
      </fieldset>
      <div className="flex gap-3"><Button type="button" variant="default" className="h-11 flex-1" onClick={close} disabled={busy}>Cancel</Button><Button type="submit" variant="primary" className="h-11 flex-1" loading={busy} disabled={busy}>{promo ? "Save changes" : "Create promo"}</Button></div>
    </form>}
  </ModalWrapper>;
}
