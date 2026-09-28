"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/atoms/Container/Container";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useGetJobById } from "../../hooks/useGetJobById";
import {
  resolveManageJobsTab,
  normalizeJobStatus,
} from "../../helpers/manageJobs";
import {
  isManagedJobInProgress,
  jobActionLabels,
} from "../../helpers/jobManagement";
import type {
  JobAction,
  JobInfoTab,
  ManagedJob,
} from "../../types/jobManagement";
import ManagedJobSkeleton from "./ManagedJobSkeleton/ManagedJobSkeleton";
import JobMilestoneInfo from "../JobMilestoneInfo/JobMilestoneInfo";
import ManagedJobSummary from "./ManagedJobSummary/ManagedJobSummary";
import JobApplicantsPanel from "./JobApplicantsPanel/JobApplicantsPanel";
import JobInvoicesPanel from "./JobInvoicesPanel/JobInvoicesPanel";
import JobPaymentsPanel from "./JobPaymentsPanel/JobPaymentsPanel";

// Kept separate from fetching so owner/artisan layouts can share the same view.
export function ManagedJobInfoView({
  job,
  isOwner,
  backHref,
  onAction,
  selectedSection,
  onSectionChange,
  originTab = "listed",
}: {
  selectedSection?: JobInfoTab;
  onSectionChange?: (tab: JobInfoTab) => void;
  originTab?: string;
  job: ManagedJob;
  isOwner: boolean;
  backHref: string;
  onAction: (action: JobAction, milestoneId?: string) => void;
}) {
  const [localTab, setLocalTab] = useState<JobInfoTab>("details");
  const selectedTab = selectedSection ?? localTab;
  const setSelectedTab = (tab: JobInfoTab) => {
    setLocalTab(tab);
    onSectionChange?.(tab);
  };
  const inProgress = isManagedJobInProgress(job.status);
  const tabs: { id: JobInfoTab; label: string }[] = [
    {
      id: "details",
      label:
        !isOwner && normalizeJobStatus(job.status) === "in-review"
          ? "Job Terms"
          : "Job Details",
    },
    ...(inProgress
      ? [
          { id: "invoices" as const, label: "Invoices" },
          { id: "payments" as const, label: "Payments" },
        ]
      : isOwner
        ? [{ id: "applicants" as const, label: "Applicants" }]
        : []),
  ];
  const tab = tabs.some((item) => item.id === selectedTab)
    ? selectedTab
    : "details";
  return (
    <Container variant="small" className="py-4">
      <div
        className={`grid min-w-0 items-start gap-4 ${tab === "details" ? "xl:grid-cols-[minmax(0,1fr)_minmax(280px,32%)]" : "grid-cols-1"}`}
      >
        <main className="min-w-0 space-y-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs text-[#707471] hover:text-[#18A154]"
          >
            <ChevronLeft className="size-4" />
            Back
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-x-4 border-b border-[#E2E8ED]">
            <nav aria-label="Job information" className="flex gap-5">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-current={tab === item.id ? "page" : undefined}
                  onClick={() => setSelectedTab(item.id)}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-3 text-sm ${tab === item.id ? "border-[#25C269] text-[#00A63E]" : "border-transparent text-[#707471] hover:text-[#18A154]"}`}
                >
                  {item.label}
                  {item.id === "applicants" && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] ${tab === item.id ? "bg-[#25C269] text-white" : "bg-[#EDEEF0] text-[#4F5D75]"}`}
                    >
                      {job.applicants}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            {inProgress && !isOwner && tab === "details" && (
              <button
                type="button"
                onClick={() => onAction("rate-employer")}
                className="py-2 text-xs text-[#6667FF] underline"
              >
                Rate employer →
              </button>
            )}
            {inProgress && isOwner && tab === "details" && (
              <div className="hidden gap-4 py-2 text-xs xl:flex">
                <button
                  type="button"
                  onClick={() => onAction("rate")}
                  className="underline"
                >
                  Rate expert →
                </button>
                <button
                  type="button"
                  onClick={() => onAction("convert")}
                  className="text-[#6667FF] underline"
                >
                  Convert to recurring job →
                </button>
              </div>
            )}
          </div>
          {tab === "details" && (
            <ManagedJobSummary
              job={job}
              originTab={originTab}
              isOwner={isOwner}
              onAction={onAction}
              onReviewApplicants={() => setSelectedTab("applicants")}
            />
          )}
          {tab === "applicants" && (
            <JobApplicantsPanel
              applicants={job.applicantsList}
              count={job.applicants}
              jobId={job.id}
              budget={job.price}
              currency={job.currency}
              originTab={originTab}
              onHire={(applicant) =>
                toast.info(`Hiring ${applicant.name} is not available yet.`)
              }
            />
          )}
          {tab === "invoices" && <JobInvoicesPanel invoices={job.invoices} />}
          {tab === "payments" && <JobPaymentsPanel payments={job.payments} />}
        </main>
        {tab === "details" && (
          <aside className="min-w-0">
            <JobMilestoneInfo
              variant="dashboard"
              managed
              milestones={job.milestones}
              onComplete={
                !isOwner && normalizeJobStatus(job.status) === "active"
                  ? (id) => onAction("complete-milestone", id)
                  : undefined
              }
              onReview={isOwner ? (id) => onAction("review", id) : undefined}
            />
            {!isOwner && normalizeJobStatus(job.status) === "rejected" && (
              <section className="mt-4 border border-[#EDEEF0] bg-[#F9F9F9] p-4">
                <div className="space-y-3 rounded-lg bg-white p-4 text-sm text-[#707471]">
                  <h2 className="text-[#FF547D]">Applicant Feedback</h2>
                  {job.applicationFeedback?.length ? (
                    job.applicationFeedback.map((reason) => (
                      <p key={reason}>{reason}</p>
                    ))
                  ) : (
                    <p>No feedback provided.</p>
                  )}
                </div>
              </section>
            )}
          </aside>
        )}
      </div>
    </Container>
  );
}

export default function ManagedJobInfo({ jobId }: { jobId: string }) {
  const { data: job, isPending, isError, refetch } = useGetJobById(jobId);
  const currentUserId = useStore((state) => state.currentUser?._id);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const section = searchParams.get("section");
  const selectedSection: JobInfoTab =
    section === "applicants" || section === "invoices" || section === "payments"
      ? section
      : "details";
  const onSectionChange = (nextSection: JobInfoTab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextSection === "details") params.delete("section");
    else params.set("section", nextSection);
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, {
      scroll: false,
    });
  };
  const tab = resolveManageJobsTab(searchParams.get("tab"));
  const backHref = routes.dashboardLinks.jobsTab(tab);
  if (isPending) return <ManagedJobSkeleton section={selectedSection} />;
  if (isError || !job)
    return (
      <div className="space-y-4 p-8 text-center text-sm">
        <Link href={backHref} className="text-[#18A154] underline">
          Back to jobs
        </Link>
        <p>We could not load this job.</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="text-[#18A154] underline"
        >
          Try again
        </button>
      </div>
    );
  return (
    <ManagedJobInfoView
      key={job.id}
      originTab={tab}
      selectedSection={selectedSection}
      onSectionChange={onSectionChange}
      job={job}
      isOwner={Boolean(currentUserId && currentUserId === job.ownerId)}
      backHref={backHref}
      onAction={(action) => {
        if (action === "rate-employer")
          router.push(
            routes.dashboardLinks.employerProfile(
              job.ownerId,
              job.id,
              tab,
              true,
            ),
          );
        else if (action === "edit")
          router.push(routes.dashboardLinks.editJob(job.id));
        else toast.info(`${jobActionLabels[action]} is not available yet.`);
      }}
    />
  );
}
