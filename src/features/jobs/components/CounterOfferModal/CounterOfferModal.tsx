"use client";

import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import { formatInputTextNumberWithCommas, removeNumberCommas } from "@/lib/helpers/formatNumbers";
import { useStore } from "@/store/authStore";
import { balanceBidMilestones } from "../../helpers/jobApplication";
import { buildCounterOffer, getCounterOfferEligibility } from "../../helpers/counterOffer";
import { useCounterBid } from "../../hooks/useCounterBid";
import type { JobApplicant } from "../../types/jobManagement";
import type { CounterOfferPayload } from "../../types/counterOffer";
import BidMilestoneFields from "../BidMilestoneFields/BidMilestoneFields";

export default function CounterOfferModal({ applicant, currency, ownerId, jobTitle, milestoneIds, onClose }: {
  applicant: JobApplicant; currency: string; ownerId: string; jobTitle: string; milestoneIds: string[]; onClose: () => void;
}) {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const eligibility = getCounterOfferEligibility(applicant, currentUserId, ownerId);
  const [maximumPrice, setMaximumPrice] = useState(String(applicant.bidAmount ?? ""));
  const [message, setMessage] = useState("");
  const [milestones, setMilestones] = useState(() => (applicant.bidMilestones ?? []).map((item) => ({ ...item, amount: String(item.amount) })));
  const [confirmation, setConfirmation] = useState<CounterOfferPayload | null>(null);
  const mutation = useCounterBid(onClose);
  const balanced = balanceBidMilestones(milestones, maximumPrice);
  const review = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!eligibility.allowed || mutation.isPending) return;
    try { setConfirmation(buildCounterOffer(maximumPrice, message, balanced, milestoneIds)); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Check your counteroffer details."); }
  };
  const submit = () => {
    if (!confirmation || !eligibility.allowed || mutation.isPending) return;
    mutation.mutate({ projectId: applicant.id, payload: confirmation });
  };
  return <ModalWrapper open onClose={(open) => { if (!open && !mutation.isPending) onClose(); }} title="Counter Offer" description={jobTitle} className="max-w-xl!">
    {confirmation && <ModalWrapper open title="Confirm Counter Offer" onClose={(open) => { if (!open && !mutation.isPending) setConfirmation(null); }} className="max-w-xl!">
      <div className="space-y-5 pt-5">
      <p>Are you sure you want to submit this counteroffer? The other party will be notified.</p>
      <PriceWrapper price={confirmation.maximumPrice} currency={currency} title="your counteroffer" />
      <ol className="space-y-3">{confirmation.milestones.map((item, index) => <li key={item.milestoneId} className="space-y-2 rounded-lg border border-[#ECECEC] p-3"><p className="text-sm">{index + 1}. {item.achievement}</p><PriceWrapper price={item.amount} currency={currency} title="price" /></li>)}</ol>
      {confirmation.message && <p className="whitespace-pre-wrap text-sm">{confirmation.message}</p>}
      {applicant.counterOfferSummary && <p className="text-xs text-[#707471]">Counteroffers remaining: {currentUserId === ownerId ? applicant.counterOfferSummary.jobOwnerRemaining : applicant.counterOfferSummary.applicantRemaining} of 2.</p>}
      {!eligibility.allowed && <p role="alert" className="text-sm text-red-600">{eligibility.reason}</p>}
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="secondary" className="h-11 w-full" disabled={mutation.isPending} onClick={() => setConfirmation(null)}>Back to Edit</Button>
        <Button type="button" variant="primary" className="h-11 w-full" loading={mutation.isPending} disabled={!eligibility.allowed || mutation.isPending} onClick={submit}>Yes, Submit</Button>
      </div>
      </div>
    </ModalWrapper>}
    <form onSubmit={review} className="min-w-0 w-full space-y-5 pt-5">
      <div className="space-y-2 rounded-xl border border-dashed border-[#D7DAD8] bg-[#F4F7F5] p-4 text-sm">
        <p className="font-semibold">{applicant.name}</p>
        {applicant.bidAmount !== undefined && <PriceWrapper price={applicant.bidAmount} currency={currency} title="current offer" />}
      </div>
      <p className="text-sm text-[#707471]">The artisan submits the original bid, the job owner can counter, and the artisan can make the final bid. After three bids, the job owner must hire the expert or reject the bid.</p>
      {applicant.counterOfferSummary && <p className="text-xs text-[#707471]">Counteroffers remaining: {currentUserId === ownerId ? applicant.counterOfferSummary.jobOwnerRemaining : applicant.counterOfferSummary.applicantRemaining} of 2.</p>}
      {!eligibility.allowed && <p role="alert" className="text-sm text-red-600">{eligibility.reason}</p>}
      <div className="space-y-2"><Label htmlFor="counter-amount" title={`Your amount (${currency})`} /><Input id="counter-amount" required inputMode="decimal" value={formatInputTextNumberWithCommas(maximumPrice)} onChange={(event) => setMaximumPrice(removeNumberCommas(formatInputTextNumberWithCommas(event.target.value)))} /></div>
      <p id="bid-allocation-note" className="text-sm text-[#707471]">Include every milestone. Milestone prices must total your counteroffer amount. The final milestone adjusts automatically; leave a positive amount for it.</p>
      <BidMilestoneFields milestones={balanced} currency={currency} onChange={(index, field, value) => setMilestones((items) => items.map((item, i) => i === index ? { ...item, [field]: value } : item))} />
      <div className="min-w-0 space-y-2"><Label htmlFor="counter-message" title="Message (optional)" /><textarea id="counter-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Can we agree on this amount?" className="block min-h-24 w-full min-w-0 max-w-full resize-y box-border rounded-[10px] bg-[#ECECEC] p-3 outline-none focus:ring-1 focus:ring-inset focus:ring-[#25C269]" /></div>
      <Button type="submit" variant="primary" className="h-11 w-full" disabled={!eligibility.allowed}>Review Counter Offer</Button>
    </form>
  </ModalWrapper>;
}
