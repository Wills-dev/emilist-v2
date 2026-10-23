"use client";

import { useState } from "react";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import { useStore } from "@/store/authStore";
import { useApplicationDetails } from "../../hooks/useApplicationDetails";
import { mapApplicationDetails } from "../../helpers/applicationDetails";
import { getCounterOfferEligibility } from "../../helpers/counterOffer";
import type { JobDetailsViewModel } from "../../types/jobDetails";
import ApplicationBidDetails from "../ApplicationBidDetails/ApplicationBidDetails";
import CounterOfferModal from "../CounterOfferModal/CounterOfferModal";

export default function MyApplicationPanel({ job }: { job: JobDetailsViewModel }) {
  const query = useApplicationDetails(job.applicationId ?? "", job.id);
  const userId = useStore((state) => state.currentUser?._id);
  const [countering, setCountering] = useState(false);
  if (!job.applicationId) return <EmptyState title="Application unavailable" description="No application was found for this job." />;
  if (query.isPending) return <p role="status" className="py-12 text-center text-sm">Loading your application…</p>;
  if (query.isError) return <EmptyState title="Unable to load your application" actionLabel="Try again" onAction={() => void query.refetch()} />;
  const application = query.data;
  const offer = mapApplicationDetails(application);
  const eligibility = getCounterOfferEligibility(offer, userId, application.creator._id);
  return <section className="rounded-xl border border-[#ECECEC] bg-white p-5">
    <h2 className="font-exo text-lg font-semibold">My Application</h2>
    {query.isFetching && <p role="status" className="pt-3 text-xs text-[#707471]">Updating application…</p>}
    <ApplicationBidDetails application={application} currency={application.job.currency ?? job.currency} busy={query.isFetching} counterAllowed={eligibility.allowed} counterReason={eligibility.reason} onCounterOffer={() => setCountering(true)} />
    {countering && <CounterOfferModal applicant={offer} currency={application.job.currency ?? job.currency} ownerId={application.creator._id} jobTitle={application.job.title} milestoneIds={job.milestones.map((item) => item.id)} onClose={() => setCountering(false)} />}
  </section>;
}
