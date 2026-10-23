"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRespondCounterBid } from "../../hooks/useRespondCounterBid";
import type { BidResponseAction } from "../../api/respondCounterBid";
import BidResponseConfirmation from "../BidResponseConfirmation/BidResponseConfirmation";
import { getBidResponseActions } from "../../helpers/bidResponseActions";
import Button from "@/components/atoms/Button/Button";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import type { ApplicationBid, ApplicationDetailsDto } from "../../types/applicationDetails";

const formatDate = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date);
};
const Milestones = ({ milestones, currency }: { milestones: ApplicationBid["milestones"]; currency: string }) => <ol className="space-y-3">
  {milestones.map((item, index) => <li key={item.milestoneId} className="space-y-2 rounded-lg border border-[#ECECEC] p-4"><p className="text-xs text-[#707471]">Milestone {index + 1}</p><p className="whitespace-pre-wrap text-sm">{item.achievement}</p><PriceWrapper price={item.amount} currency={currency} title="price" /></li>)}
</ol>;

export default function ApplicationBidDetails({ application, currency, counterAllowed, counterReason, busy = false, onCounterOffer }: {
  application: ApplicationDetailsDto; currency: string; counterAllowed: boolean; counterReason: string; busy?: boolean; onCounterOffer: () => void;
}) {
  const [confirmation, setConfirmation] = useState<{ action: BidResponseAction; offerKey: string } | null>(null);
  const mutation = useRespondCounterBid(() => setConfirmation(null));
  const current = application.currentBid;
  const isOwner = application.participantRole === "job_owner";
  const { canRespond, counterLimitReached } = getBidResponseActions(application);
  const showCounter = !counterLimitReached && (canRespond || counterAllowed);
  const actionCount = (canRespond ? 2 : 0) + (showCounter ? 1 : 0);
  const offerKey = JSON.stringify([application._id, application.currentBid, application.latestCounterOffer, application.bidHistory]);
  const requestResponse = (action: BidResponseAction) => setConfirmation({ action, offerKey });
  const confirmResponse = () => {
    if (!confirmation || mutation.isPending || busy) return;
    if (!canRespond || offerKey !== confirmation.offerKey) {
      setConfirmation(null);
      toast.info("This offer has changed. Review the latest terms before responding.");
      return;
    }
    mutation.mutate({ projectId: application._id, action: confirmation.action });
  };
  const confirmationModal = confirmation && current ? <BidResponseConfirmation action={confirmation.action} amount={current.maximumPrice} currency={currency} isOwner={isOwner} busy={mutation.isPending} disabled={busy || !canRespond} onCancel={() => setConfirmation(null)} onConfirm={confirmResponse} /> : null;
  return <div className="space-y-6 pt-5 text-[#303632]">
    <section className="space-y-4" aria-label="Current offer">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F4F7F5] p-4"><h3 className="font-exo font-semibold">Current Offer</h3><StatusBadge label={application.status} />{current && <PriceWrapper price={current.maximumPrice} currency={currency} title="offered amount" />}</div>
      {current ? <Milestones milestones={current.milestones} currency={currency} /> : <p className="text-sm text-[#707471]">This application has no bid terms.</p>}
      {current && <>
        {counterReason && <p className="text-sm text-[#707471]">{counterReason}</p>}
        {actionCount > 0 && <div className={`grid gap-3 ${actionCount === 3 ? "sm:grid-cols-3" : actionCount === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
          {canRespond && (isOwner ? <Button type="button" variant="primary" className="h-11 w-full" disabled={busy || mutation.isPending} onClick={() => requestResponse("accept")}>Hire Expert</Button> : <Button type="button" variant="primary" className="h-11 w-full" disabled={busy || mutation.isPending} onClick={() => requestResponse("accept")}>Accept Bid</Button>)}
          {canRespond && <Button type="button" variant="danger" className="h-11 w-full" disabled={busy || mutation.isPending} onClick={() => requestResponse("reject")}>Reject Bid</Button>}
          {showCounter && <Button type="button" variant="secondary" className="h-11 w-full" disabled={!counterAllowed || busy} onClick={onCounterOffer}>Counter Offer</Button>}
        </div>}
      </>}
    </section>
    <details className="rounded-xl border border-[#ECECEC] p-4">
      <summary className="cursor-pointer font-exo font-semibold">Bid History ({application.bidHistory.length})</summary>
      <ol className="mt-4 space-y-4">
        {application.bidHistory.map((entry, index) => <li key={entry._id ?? `${entry.type}-${index}`} className="space-y-3 rounded-lg bg-[#F9F9F9] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="text-sm font-semibold">{entry.type === "INITIAL_BID" ? "Original Bid" : "Counter Offer"} · {entry.madeByRole === "job_owner" ? "Job Owner" : "Artisan"}</h4><StatusBadge label={entry.status} /></div>
          <PriceWrapper price={entry.maximumPrice} currency={currency} title="amount" />
          {entry.createdAt && <p className="text-xs text-[#707471]">Sent: {formatDate(entry.createdAt)}</p>}
          {entry.respondedAt && <p className="text-xs text-[#707471]">Responded: {formatDate(entry.respondedAt)}</p>}
          {entry.message && <p className="whitespace-pre-wrap text-sm">{entry.message}</p>}
          {(entry.milestones ?? (entry.type === "INITIAL_BID" ? application.initialBid?.milestones : undefined))?.length ? <Milestones milestones={entry.milestones ?? application.initialBid?.milestones ?? []} currency={currency} /> : null}
        </li>)}
      </ol>
      {!application.bidHistory.length && <p className="mt-3 text-sm text-[#707471]">No bid history available.</p>}
    </details>
    {confirmationModal}
  </div>;
}
