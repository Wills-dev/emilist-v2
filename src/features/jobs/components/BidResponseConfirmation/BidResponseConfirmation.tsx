import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Button from "@/components/atoms/Button/Button";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import type { BidResponseAction } from "../../api/respondCounterBid";

export default function BidResponseConfirmation({ action, amount, currency, isOwner, busy, disabled, onCancel, onConfirm }: {
  action: BidResponseAction; amount: number; currency: string; isOwner: boolean; busy: boolean; disabled: boolean; onCancel: () => void; onConfirm: () => void;
}) {
  const accepting = action === "accept";
  return <ModalWrapper open title={accepting ? isOwner ? "Hire this expert?" : "Accept this bid?" : "Reject this bid?"} onClose={(open) => { if (!open && !busy) onCancel(); }} className="max-w-md!">
    <div className="space-y-5 pt-5">
    <p className="text-sm text-[#707471]">{accepting ? "Accepting finalizes these terms, activates the job, and rejects competing applications. Are you sure you want to continue?" : "Rejecting restores the preceding bid terms. The sender may revise their offer if they have counters remaining. Are you sure you want to continue?"}</p>
    <PriceWrapper price={amount} currency={currency} title="current offer" />
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Button type="button" variant="default" className="h-11 w-full" disabled={busy} onClick={onCancel}>Go Back</Button>
      <Button type="button" variant={accepting ? "primary" : "danger"} className="h-11 w-full" loading={busy} disabled={disabled || busy} onClick={onConfirm}>{accepting ? "Yes, Accept Bid" : "Yes, Reject Bid"}</Button>
    </div>
    </div>
  </ModalWrapper>;
}
