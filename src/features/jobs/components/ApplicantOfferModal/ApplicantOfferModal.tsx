"use client";

import { useState } from "react";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import { useStore } from "@/store/authStore";
import { useApplicationDetails } from "../../hooks/useApplicationDetails";
import { mapApplicationDetails } from "../../helpers/applicationDetails";
import { getCounterOfferEligibility } from "../../helpers/counterOffer";
import type { JobApplicant } from "../../types/jobManagement";
import ApplicationBidDetails from "../ApplicationBidDetails/ApplicationBidDetails";
import CounterOfferModal from "../CounterOfferModal/CounterOfferModal";

export default function ApplicantOfferModal({ applicant, jobId, milestoneIds, currency, onClose }: {
  applicant: JobApplicant; jobId: string; milestoneIds: string[]; currency: string; onClose: () => void;
}) {
  const query = useApplicationDetails(applicant.id, jobId);
  const userId = useStore((state) => state.currentUser?._id);
  const [countering, setCountering] = useState(false);
  const application = query.data;
  const offer = application ? mapApplicationDetails(application) : null;
  const eligibility = offer && application ? getCounterOfferEligibility(offer, userId, application.creator._id) : { allowed: false, reason: "" };
  if (countering && offer && application) return <CounterOfferModal applicant={offer} currency={application.job.currency ?? currency} ownerId={application.creator._id} jobTitle={application.job.title} milestoneIds={milestoneIds} onClose={() => setCountering(false)} />;
  return <ModalWrapper open onClose={(open) => { if (!open) onClose(); }} title="Artisan’s Offer" description={application?.job.title ?? applicant.name} className="max-w-xl!">
    {query.isPending ? <p role="status" className="py-10 text-center text-sm">Loading application…</p> : query.isError ? <EmptyState title="Unable to load the offer" actionLabel="Try again" onAction={() => void query.refetch()} /> : <>
      {query.isFetching && <p role="status" className="pt-3 text-xs text-[#707471]">Updating offer…</p>}
      <ApplicationBidDetails application={query.data} currency={query.data.job.currency ?? currency} busy={query.isFetching} counterAllowed={eligibility.allowed} counterReason={eligibility.reason} onCounterOffer={() => setCountering(true)} />
    </>}
  </ModalWrapper>;
}
