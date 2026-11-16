"use client";

import { CircleCheck } from "lucide-react";
import { getApplicantSelectionState } from "../../helpers/applicantSelectionState";
import { useRef, useState } from "react";
import ApplicationResponseConfirmation from "../ApplicationResponseConfirmation/ApplicationResponseConfirmation";
import ApplicantOfferModal from "../ApplicantOfferModal/ApplicantOfferModal";
import Link from "next/link";
import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import ItemName from "@/components/atoms/ItemName/ItemName";
import DotInfoItem from "@/components/atoms/DotInfoItem/DotInfoItem";
import Rating from "@/components/molecules/Rating/Rating";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import { useUpdateApplicationStatus } from "../../hooks/useUpdateApplicationStatus";
import type { JobApplicant } from "../../types/jobManagement";

export default function JobApplicantCard({
  applicant,
  jobType,
  jobStatus,
  acceptedApplicationId,
  hasAcceptedApplication = false,
  budget,
  currency,
  profileHref,
  reviewsHref,
  jobId,
  milestoneIds,
}: {
  applicant: JobApplicant;
  jobType?: string;
  jobStatus?: string;
  acceptedApplicationId?: string;
  hasAcceptedApplication?: boolean;
  budget: number;
  currency: string;
  profileHref?: string;
  reviewsHref?: string;
  jobId: string;
  milestoneIds: string[];
}) {
  const [offerOpen, setOfferOpen] = useState(false);
  const [responseAction, setResponseAction] = useState<"accept" | "reject" | null>(null);
  const responding = useRef(false);
  const responseMutation = useUpdateApplicationStatus(() => setResponseAction(null));
  const resolvedJobType = jobType?.trim().toLowerCase() || applicant.jobType?.trim().toLowerCase();
  const biddable = resolvedJobType === "biddable";
  const regular = resolvedJobType === "regular";
  const selectionState = getApplicantSelectionState({ applicant, jobStatus, acceptedApplicationId, hasAcceptedApplication });
  const canAcceptApplication = selectionState.canRespond;
  return (
    <article className={`min-w-0 space-y-4 rounded-2xl border bg-[#F9F9F9] p-4 sm:p-6 ${selectionState.accepted ? "border-[#A5DDBA]" : "border-[#F1F2F9]"} ${selectionState.locked ? "opacity-50" : ""}`}>
      {selectionState.accepted && <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9F8EF] px-3 py-1 text-xs font-medium text-[#18A154]"><CircleCheck className="size-4" aria-hidden="true" />{selectionState.jobCancelled ? "Previously accepted" : "Accepted"}</div>}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#ECECEC] pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">
            <ProfileAvatar variant="large" profileImage={applicant.image} />
          </div>
          <div className="min-w-0 space-y-2">
            <div className="block text-[#303632]">
              <ItemName
                title={applicant.name}
                isVerified={applicant.isVerified}
              />
            </div>
            {reviewsHref && <div className="flex flex-wrap items-center gap-2">
              <Rating rating={applicant.rating} />
              <Link
                href={reviewsHref}
                className="text-[10px] text-[#707471] hover:underline"
              >
                ({applicant.reviewCount} reviews)
              </Link>
            </div>}
          </div>
        </div>
        <PriceWrapper
          price={budget}
          currency={currency}
          title="budget price"
        />
      </div>
      <div className="space-y-2 rounded-lg border border-[#F1F2F9] bg-linear-to-b from-white to-[#FBFBFB] p-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <DotInfoItem
            desc={applicant.location}
            variant="purple"
            className="min-w-0 max-w-full"
          />
          {applicant.jobsCompleted !== undefined && (
            <DotInfoItem desc={`${applicant.jobsCompleted} jobs completed`} />
          )}
          {applicant.serviceType && (
            <DotInfoItem desc={applicant.serviceType} />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <DotInfoItem desc={applicant.level} />
          {applicant.yearsOfExperience !== undefined && (
            <DotInfoItem
              desc={`${applicant.yearsOfExperience}+ years of experience`}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 text-xs font-medium sm:grid-cols-2">
        {profileHref ? <Link
          href={profileHref}
          className={`flex h-11 items-center justify-center rounded-lg border border-[#D9D9D9] bg-[#FBFFF8] text-[#5E625F] hover:bg-white ${regular ? "sm:col-span-2" : ""}`}
        >View Profile</Link> : <button type="button" disabled className={`h-11 rounded-lg border border-[#D9D9D9] text-[#5E625F] opacity-50 ${regular ? "sm:col-span-2" : ""}`}>View Profile</button>}
        {biddable && <button type="button" onClick={() => setOfferOpen(true)} className="h-11 rounded-lg border border-[#25C269] text-[#18A154] hover:bg-[#F0FDF5]">{selectionState.accepted ? selectionState.jobCancelled ? "View Previous Offer" : "View Accepted Offer" : "View Offer"}</button>}
        {regular && !selectionState.accepted && <>
          <button type="button" onClick={() => setResponseAction("reject")} disabled={!canAcceptApplication || responseMutation.isPending} className="h-11 rounded-lg border border-[#FF5D7A] text-[#E84F6A] hover:bg-[#FFF0F3] disabled:cursor-not-allowed disabled:opacity-50">Reject Application</button>
          <button type="button" onClick={() => setResponseAction("accept")} disabled={!canAcceptApplication || responseMutation.isPending} className="h-11 rounded-lg bg-[#25C269] text-white hover:bg-[#18A154] disabled:cursor-not-allowed disabled:opacity-50">Accept Application</button>
        </>}
      </div>
      {regular && !selectionState.accepted && responseAction && <ApplicationResponseConfirmation disabled={!canAcceptApplication} action={responseAction} applicantName={applicant.name} busy={responseMutation.isPending} onClose={() => {
        if (!responseMutation.isPending && !responding.current) setResponseAction(null);
      }} onConfirm={() => {
        if (!canAcceptApplication || responseMutation.isPending || responding.current) return;
        responding.current = true;
        responseMutation.mutate({ projectId: applicant.id, status: responseAction === "accept" ? "accepted" : "rejected" }, {
          onSettled: () => { responding.current = false; },
        });
      }} />}
      {biddable && offerOpen && <ApplicantOfferModal key={`${acceptedApplicationId ?? ""}:${selectionState.accepted}:${selectionState.locked}:${selectionState.jobCancelled}`} readOnly={selectionState.accepted || selectionState.locked} readOnlyReason={selectionState.accepted ? "This application was already accepted. You can review its offer and history." : selectionState.locked ? "Another artisan has already been accepted for this job. Offer responses are unavailable unless the job is cancelled." : undefined} applicant={applicant} currency={applicant.currency ?? currency} onClose={() => setOfferOpen(false)} jobId={jobId} milestoneIds={milestoneIds} />}
    </article>
  );
}
