"use client";

import { normalizeJobStatus } from "../../helpers/manageJobs";
import { useState } from "react";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import { formatInputTextNumberWithCommas, removeNumberCommas } from "@/lib/helpers/formatNumbers";
import { useStore } from "@/store/authStore";
import { toast } from "sonner";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Select from "@/components/atoms/Select/Select";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { useUserBusinesses } from "@/features/businesses/hooks/useUserBusinesses";
import { useApplyJob } from "../../hooks/useApplyJob";
import type { JobDetailsViewModel } from "../../types";
import BidMilestoneFields from "../BidMilestoneFields/BidMilestoneFields";
import { summarizeMilestoneAmounts } from "../../helpers/postJobMilestones";
import { balanceBidMilestones, buildJobApplication, type BidMilestoneDraft } from "../../helpers/jobApplication";

const JobApplicationModal = ({ job, onClose }: { job: JobDetailsViewModel; onClose: () => void }) => {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const alreadyApplied = Boolean(job.applicationId) || normalizeJobStatus(job.applicationStatus ?? job.status) === "applied";
  const isOwner = Boolean(currentUserId && currentUserId === job.ownerId);
  const businesses = useUserBusinesses();
  const application = useApplyJob(onClose);
  const [businessId, setBusinessId] = useState("");
  const [maximumPrice, setMaximumPrice] = useState(String(job.price));
  const [milestones, setMilestones] = useState<BidMilestoneDraft[]>(() => job.milestones.map((item) => ({
    milestoneId: item.id, amount: String(item.amount), achievement: item.achievement ?? item.title,
  })));
  const allocation = summarizeMilestoneAmounts(milestones, maximumPrice);
  const balancedMilestones = balanceBidMilestones(milestones, maximumPrice);
  const biddable = job.type === "biddable";
  const validType = biddable || job.type === "regular";
  const updateMilestone = (index: number, field: "amount" | "achievement", value: string) => {
    setMilestones((items) => items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };
  const submit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUserId || alreadyApplied || isOwner || application.isPending || !validType || !businesses.data?.some((item) => item.id === businessId)) return;
    try {
      const payload = buildJobApplication({ jobId: job.id, businessId, type: job.type, maximumPrice, milestones: balancedMilestones });
      application.mutate(payload);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit your application.");
    }
  };

  return (
    <ModalWrapper open onClose={(open) => { if (!open && !application.isPending) onClose(); }} title="Job Application" className="max-w-xl!" description="Choose the business or service you want to apply with.">
      <form onSubmit={submit} className="space-y-6 pt-5 text-[#5E625F]">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-[#D7DAD8] bg-[#F4F7F5] p-4 text-sm">
          <strong className="text-[#303632]">{job.title}</strong>
          <span>Job ID: {job.id.slice(-6).toUpperCase()}</span>
          <PriceWrapper price={job.price} currency={job.currency} title="budget starts from" />
        </div>
        <div className="space-y-2 border-t border-[#ECECEC] pt-5">
          <Label htmlFor="application-business" title="Select the business or service you want to apply with" />
          {businesses.isPending ? <p role="status">Loading businesses…</p> : businesses.isError ? <p role="alert">Unable to load businesses. <button type="button" className="underline" onClick={() => void businesses.refetch()}>Try again</button></p> : businesses.data?.length ? (
            <Select id="application-business" required value={businessId} onChange={(e) => setBusinessId(e.target.value)} placeholder="Choose option" options={businesses.data.map((item) => ({ label: item.businessName, value: item.id }))} />
          ) : <p>You need a business to apply. <a href="/become-expert" className="text-[#18A154] underline">Add a business or service</a></p>}
        </div>
        {biddable && <>
          <p className="text-sm">The job’s current prices and achievements are filled in below. You can enter your own prices and update the achievements before submitting.</p>
          <div className="space-y-2">
            <Label htmlFor="bid-maximum-price" title={`Your maximum price (${job.currency})`} />
            <Input id="bid-maximum-price" type="text" inputMode="decimal" required value={formatInputTextNumberWithCommas(maximumPrice)} onChange={(e) => setMaximumPrice(removeNumberCommas(formatInputTextNumberWithCommas(e.target.value)))} />
          </div>
          <p className="text-sm" id="bid-allocation-note">Milestone prices must add up exactly to your bid amount. The final milestone is calculated automatically as you change your bid or earlier milestone prices. Leave a positive amount for the final milestone.</p>
          {milestones.length > 0 && allocation.status === "over" && <p role="alert" className="text-sm text-red-600">Your milestone prices use up or exceed your bid amount. Reduce an earlier milestone price or increase your bid so the final milestone has a positive amount.</p>}
          <BidMilestoneFields milestones={balancedMilestones} currency={job.currency} onChange={updateMilestone} />
        </>}
        {alreadyApplied && <p role="status">You have already applied for this job.</p>}
        {isOwner && <p role="alert">You own this job and cannot apply for it.</p>}
        {!validType && <p role="alert">This job’s application type is unavailable. Please try again later.</p>}
        <Button type="submit" variant="primary" className="h-11 w-full" loading={application.isPending} disabled={alreadyApplied || isOwner || !currentUserId || !businessId || businesses.isError || businesses.isPending || !validType || application.isPending}>Submit Application</Button>
      </form>
    </ModalWrapper>
  );
};

export default JobApplicationModal;
