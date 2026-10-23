"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import JobApplicantCard from "../../JobApplicantCard/JobApplicantCard";
import { routes } from "@/lib/helpers/routes";
import { useJobApplicants } from "../../../hooks/useJobApplicants";
import { useApplicantFilters } from "../../../hooks/useApplicantFilters";
import { APPLICATION_STATUSES } from "../../../types/applicants";
import { POST_JOB_EXPERIENCE_OPTIONS } from "../../../constants/postJob";
import type { JobApplicant } from "../../../types/jobManagement";

export default function JobApplicantsPanel({ jobId, ownerId, budget, currency, jobType, milestoneIds, originTab = "listed", onHire }: {
  jobId: string;
  jobType?: string;
  milestoneIds: string[];
  ownerId: string;
  budget: number;
  currency: string;
  originTab?: string;
  onHire: (applicant: JobApplicant) => void;
}) {
  const { page, limit, status, experienceLevel, setPage, setLimit, setStatus, setExperienceLevel } = useApplicantFilters();
  const [showFilters, setShowFilters] = useState(false);
  const query = useJobApplicants({ jobId, page, limit, ...(status ? { status } : {}), ...(experienceLevel ? { experienceLevel } : {}) }, ownerId);
  const totalPages = Math.max(1, Math.ceil((query.data?.total ?? 0) / (query.data?.limit ?? limit)));
  const selectClass = "max-w-full rounded-full bg-[#EDEEF0] px-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#25C269]";

  return <section className="space-y-6" aria-label="Job applicants">
    <div className="flex flex-wrap items-center gap-3 py-3 text-sm text-[#5E625F]">
      <button type="button" aria-label="Toggle applicant filters" aria-expanded={showFilters} onClick={() => setShowFilters((value) => !value)} className="rounded-full bg-[#EDEEF0] px-4 py-2"><SlidersHorizontal className="size-4" /></button>
      <div className={`${showFilters ? "flex" : "hidden sm:flex"} flex-wrap gap-3`}>
        <select aria-label="Experience level" value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)} className={selectClass}>
          <option value="">Experience level</option>
          {POST_JOB_EXPERIENCE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <select aria-label="Application status" value={status} onChange={(event) => setStatus(event.target.value)} className={selectClass}>
          <option value="">Status</option>
          {APPLICATION_STATUSES.map((value) => <option key={value} value={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</option>)}
        </select>
      </div>
      <label className="ml-auto flex items-center gap-2 text-xs">Per page
        <select value={limit} onChange={(event) => setLimit(Number(event.target.value))} className={selectClass}>
          {[4, 8, 12, 20].map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
      </label>
    </div>
    <div className="min-h-72">
      {query.isPending ? <p role="status" className="py-12 text-center text-sm">Loading applicants…</p> : query.isError ?
        <EmptyState title="Unable to load applicants" description="Please try again." actionLabel="Try again" onAction={() => void query.refetch()} /> :
        !query.data.applicants.length ? <EmptyState title="No applicants found" description={status || experienceLevel ? "No applications match your filters." : "Applications will appear here when artisans apply."} /> :
        <div className="grid gap-6 xl:grid-cols-2">
          {query.data.applicants.map((applicant) => <JobApplicantCard key={applicant.id} applicant={applicant} jobType={jobType} budget={budget} currency={currency}
            profileHref={applicant.expertId ? routes.dashboardLinks.jobApplicantInfo(jobId, applicant.expertId, originTab) : undefined}
            reviewsHref={applicant.expertId ? routes.dashboardLinks.jobApplicantReviews(jobId, applicant.expertId, originTab) : undefined}
            onHire={() => onHire(applicant)} jobId={jobId} milestoneIds={milestoneIds} />)}
        </div>}
    </div>
    <PaginationPanel variant="inline" page={page} totalPages={query.isPending || query.isError ? undefined : totalPages} hasMore={false} onPrev={() => setPage(Math.max(1, page - 1))} onNext={() => setPage(Math.min(totalPages, page + 1))} />
  </section>;
}
