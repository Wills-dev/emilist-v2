"use client";

import { useState } from "react";
import ApplicantOfferModal from "../ApplicantOfferModal/ApplicantOfferModal";
import Link from "next/link";
import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import ItemName from "@/components/atoms/ItemName/ItemName";
import DotInfoItem from "@/components/atoms/DotInfoItem/DotInfoItem";
import Rating from "@/components/molecules/Rating/Rating";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import type { JobApplicant } from "../../types/jobManagement";

export default function JobApplicantCard({
  applicant,
  jobType,
  budget,
  currency,
  profileHref,
  reviewsHref,
  onHire,
  jobId,
  milestoneIds,
}: {
  applicant: JobApplicant;
  jobType?: string;
  budget: number;
  currency: string;
  profileHref?: string;
  reviewsHref?: string;
  onHire: () => void;
  jobId: string;
  milestoneIds: string[];
}) {
  const [offerOpen, setOfferOpen] = useState(false);
  const biddable = (applicant.jobType ?? jobType)?.trim().toLowerCase() === "biddable";
  return (
    <article className="min-w-0 space-y-4 rounded-2xl border border-[#F1F2F9] bg-[#F9F9F9] p-4 sm:p-6">
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
      <div className="grid grid-cols-2 gap-3 text-xs font-medium">
        {profileHref && <Link
          href={profileHref}
          className="flex h-11 items-center justify-center rounded-lg border border-[#D9D9D9] bg-[#FBFFF8] text-[#5E625F] hover:bg-white"
        >
          View Profile
        </Link>}
        {biddable ? <button type="button" onClick={() => setOfferOpen(true)} className="h-11 rounded-lg border border-[#25C269] text-[#18A154] hover:bg-[#F0FDF5]">View Offer</button> :
          <button type="button" onClick={onHire} disabled={!!applicant.status && !["pending", "applied"].includes(applicant.status) || !applicant.expertId} className="h-11 rounded-lg border border-[#25C269] text-[#18A154] hover:bg-[#F0FDF5] disabled:cursor-not-allowed disabled:opacity-50">Hire Expert</button>}

      </div>
      {offerOpen && <ApplicantOfferModal applicant={applicant} currency={applicant.currency ?? currency} onClose={() => setOfferOpen(false)} jobId={jobId} milestoneIds={milestoneIds} />}
    </article>
  );
}
