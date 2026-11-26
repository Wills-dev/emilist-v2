"use client";
import { useRef, useState, type SubmitEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { useStore } from "@/store/authStore";
import { canPromote, promotionCopy, promotionPlans, type PromotionType } from "../../helpers/promotion";
import { useCreatePromotion } from "../../hooks/useCreatePromotion";

export default function PromoteListingModal({ id, type, ownerId, onClose }: { id: string; type: PromotionType; ownerId: string; onClose: () => void }) {
  const userId = useStore((state) => state.currentUser?._id);
  const [duration, setDuration] = useState(7);
  const submitting = useRef(false);
  const campaign = useCreatePromotion(onClose);
  const copy = promotionCopy[type];
  const isOwner = canPromote(userId, ownerId);
  const close = () => { if (!submitting.current) onClose(); };
  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isOwner || submitting.current) return;
    submitting.current = true;
    try { await campaign.mutateAsync({ id, type, duration }); }
    catch { /* The mutation displays the error; preserve the selected plan for retry. */ }
    finally { submitting.current = false; }
  };
  if (!isOwner) return null;
  return <ModalWrapper open title={copy.title} onClose={close} showCloseButton={!campaign.isPending} className="max-w-[526px]! p-6!" headerClassName="border-b border-[#ECECEC] pb-5" titleClassName="text-[22px]!">
    <form onSubmit={submit} className="space-y-7 pt-5">
      <p className="text-sm leading-6 text-[#667085] sm:text-base">{copy.description}</p>
      <fieldset disabled={campaign.isPending} className="grid grid-cols-2 gap-2 rounded-[10px] border border-dashed border-[#D9D9D9] bg-[#F6F7F9] p-2 min-[400px]:grid-cols-4">
        <legend className="sr-only">Promotion duration and price</legend>
        {promotionPlans.map((plan) => <label key={plan.duration} className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-md border px-1 py-2.5 text-center transition-colors focus-within:ring-2 focus-within:ring-[#25C269] ${duration === plan.duration ? "border-[#25C269] bg-[#F0FDF5] text-[#25C269]" : "border-[#F1F2F9] bg-white text-[#5E625F]"} ${campaign.isPending ? "cursor-wait opacity-60" : ""}`}>
          <input type="radio" name="promotion-duration" value={plan.duration} checked={duration === plan.duration} onChange={() => setDuration(plan.duration)} className="sr-only" />
          <span className="text-xs">{plan.duration} days</span>
          <span className="text-sm font-semibold">₦{plan.price.toLocaleString("en-NG")}</span>
        </label>)}
      </fieldset>
      <div className="flex gap-3 pt-1">
        <Button type="button" variant="default" className="h-12 flex-1 bg-white" disabled={campaign.isPending} onClick={close}>Cancel</Button>
        <Button type="submit" variant="primary" className="h-12 flex-1 max-sm:px-3" loading={campaign.isPending} disabled={!isOwner}>Create Campaign</Button>
      </div>
    </form>
  </ModalWrapper>;
}
