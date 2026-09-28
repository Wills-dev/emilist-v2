"use client";

import Link from "next/link";
import {
  Pencil,
  Trash2,
  MessageSquare,
  CircleHelp,
  MoreVertical,
} from "lucide-react";
import { DropdownMenu } from "radix-ui";
import JobCategory from "../../JobCategory/JobCategory";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import LocationIcon from "@/components/atoms/icons/LocationIcon/LocationIcon";
import ClockIcon from "@/components/atoms/icons/ClockIcon/ClockIcon";
import UserIcon from "@/components/atoms/icons/UserIcon/UserIcon";
import LevelIcon from "@/components/atoms/icons/LevelIcon/LevelIcon";
import MilestoneIcon from "@/components/atoms/icons/MilestoneIcon/MilestoneIcon";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import ImageSliderWrapper from "@/components/molecules/ImageSliderWrapper/ImageSliderWrapper";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";
import Button from "@/components/atoms/Button/Button";
import { routes } from "@/lib/helpers/routes";
import {
  normalizeJobStatus,
  resolveJobStatusMeta,
} from "../../../helpers/manageJobs";
import {
  getJobPrimaryAction,
  getJobStatusMessage,
  isManagedJobInProgress,
  jobActionLabels,
} from "../../../helpers/jobManagement";
import type { JobAction, ManagedJob } from "../../../types/jobManagement";

const iconButton =
  "inline-flex size-9 items-center justify-center rounded-md bg-[#EDEEF0] text-[#737774] hover:bg-[#E1E4E2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C269]";

export default function ManagedJobSummary({
  job,
  isOwner,
  onAction,
  onReviewApplicants,
  originTab = "listed",
}: {
  originTab?: string;
  job: ManagedJob;
  isOwner: boolean;
  onAction: (action: JobAction, milestoneId?: string) => void;
  onReviewApplicants: () => void;
}) {
  const status = normalizeJobStatus(job.status);
  const meta = resolveJobStatusMeta(status);
  const inProgress = isManagedJobInProgress(status);
  const primaryAction = getJobPrimaryAction(status, isOwner);
  const reviewIndex = job.milestones.findIndex(
    (milestone) => normalizeJobStatus(milestone.status ?? "") === "in-review",
  );
  const pausedIndex = job.milestones.findIndex(
    (milestone) => normalizeJobStatus(milestone.status ?? "") === "paused",
  );
  const activeIndex = job.milestones.findIndex((milestone) =>
    ["active", "in-progress"].includes(
      normalizeJobStatus(milestone.status ?? ""),
    ),
  );
  const message =
    status === "active" && isOwner && reviewIndex >= 0
      ? `Review Milestone ${reviewIndex + 1} to proceed…`
      : status === "active" && !isOwner && activeIndex >= 0
        ? `Milestone ${activeIndex + 1} is in progress`
        : status === "active" && !isOwner && reviewIndex >= 0
          ? `Waiting for employer to review Milestone ${reviewIndex + 1}`
          : status === "paused" && pausedIndex >= 0
            ? `Paused at Milestone ${pausedIndex + 1}`
            : getJobStatusMessage(status, isOwner);
  return (
    <article className="space-y-6 rounded-xl border border-[#ECECEC] bg-[#F9F9F9] px-3 py-5 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <JobCategory category={job.category} variant="secondary" />
        <StatusBadge label={meta.label} tone={meta.tone} />
      </div>
      <div className="space-y-3 border-b border-[#ECECEC] pb-4">
        {message && (
          <p
            className={`text-xs italic ${status === "overdue" ? "text-[#FF5D7A]" : status === "paused" ? "text-[#FF9C2B]" : status === "active" ? "text-[#18A154]" : "text-[#707471]"}`}
          >
            {message}
          </p>
        )}
        <div
          className={`flex items-start justify-between gap-3 ${inProgress ? "" : "flex-wrap"}`}
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <h1 className="font-exo text-lg font-semibold text-[#303632]">
              {job.title}
            </h1>
            <IdentifierBadge label="Job ID" value={job.id} />
          </div>
          {!inProgress && (
            <PriceWrapper
              price={job.price}
              currency={job.currency}
              title="budget starts from"
            />
          )}
          {(inProgress ||
            (!isOwner &&
              ["applied", "in-review", "rejected"].includes(status))) && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  aria-label="Job options"
                  disabled={status === "rejected"}
                  className={`${iconButton} disabled:opacity-40`}
                >
                  <MoreVertical className="size-4" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={5}
                  className="z-50 min-w-44 rounded-lg border border-[#ECECEC] bg-white p-1 shadow-lg"
                >
                  {(
                    (isOwner
                      ? [
                          "rate",
                          "convert",
                          ...(status !== "completed" ? ["cancel"] : []),
                        ]
                      : inProgress
                        ? [
                            "rate-employer",
                            ...(status === "overdue" ? ["cancel"] : []),
                          ]
                        : status === "applied"
                          ? ["withdraw"]
                          : status === "in-review"
                            ? ["counter-offer", "accept"]
                            : []) as JobAction[]
                  ).map((action) => (
                    <DropdownMenu.Item
                      key={action}
                      onSelect={() => onAction(action)}
                      className="cursor-pointer rounded px-3 py-2 text-sm text-[#5E625F] outline-none data-[highlighted]:bg-[#F0FDF5]"
                    >
                      {jobActionLabels[action]}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#ECECEC] pb-5">
        <div className="flex max-w-lg flex-wrap items-center gap-x-5 gap-y-4 rounded-lg border border-[#F1F2F9] bg-white/60 p-3">
          <InfoItem
            value={job.location}
            icon={<LocationIcon />}
            className="text-[#6667FF]"
          />
          <InfoItem value={job.duration} icon={<ClockIcon />} />
          <InfoItem
            value={`${job.applicants} applicants`}
            icon={<UserIcon />}
          />
          <InfoItem value={job.level} icon={<LevelIcon />} />
          <div className="flex items-center gap-2">
            <InfoItem
              value={`${job.milestones.length} milestones`}
              icon={<MilestoneIcon />}
            />
            <a
              href="#milestone"
              className="text-xs text-[#6667FF] underline xl:hidden"
            >
              Show →
            </a>
          </div>
        </div>
        <div className="flex gap-3">
          {isOwner && !inProgress && (
            <>
              <button
                type="button"
                aria-label="Remove job listing"
                className={iconButton}
                onClick={() => onAction("remove")}
              >
                <Trash2 className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Edit job"
                className={iconButton}
                onClick={() => onAction("edit")}
              >
                <Pencil className="size-4" />
              </button>
            </>
          )}
          {inProgress && (
            <>
              <Link
                href={routes.dashboardLinks.messages}
                aria-label="Messages"
                className={iconButton}
              >
                <MessageSquare className="size-4" />
              </Link>
              <Link
                href={routes.dashboardLinks.support}
                aria-label="Get support"
                className={iconButton}
              >
                <CircleHelp className="size-4" />
              </Link>
            </>
          )}
        </div>
      </div>
      <ImageSliderWrapper
        images={job.images}
        productName={job.title}
        imageClassName="h-auto aspect-square sm:aspect-[2/1] sm:h-auto"
        showFileNames
        attachments={job.attachments}
      />
      {isOwner && inProgress && job.expert && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <UserRatingCard
            id={job.expert.id}
            profileHref={routes.dashboardLinks.jobApplicantInfo(
              job.id,
              job.expert.id,
              originTab,
            )}
            imgUrl={job.expert.image}
            fullName={job.expert.name}
            rating={job.expert.rating}
            noOfReviews={job.expert.reviewCount}
          />
          <IdentifierBadge label="Expert ID" value={job.expert.id} />
        </div>
      )}
      {!isOwner && inProgress && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <UserRatingCard
            id={job.ownerId}
            fullName={job.ownerName}
            imgUrl={job.ownerImage}
            rating={job.ownerRating}
            noOfReviews={job.ownerReviewCount}
            isVerified={job.ownerVerified}
            profileHref={routes.dashboardLinks.employerProfile(
              job.ownerId,
              job.id,
              originTab,
            )}
            reviewsHref={routes.dashboardLinks.employerProfile(
              job.ownerId,
              job.id,
              originTab,
              true,
            )}
          />
          <IdentifierBadge
            label="Employer ID"
            value={job.ownerId}
            maxWidth="max-w-full"
          />
        </div>
      )}
      <div className="space-y-4 rounded-lg bg-white p-4 text-sm leading-relaxed text-[#5E625F]">
        {job.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {isOwner && status === "in-review" ? (
        <Button
          variant="primary"
          className="h-11 w-full"
          onClick={onReviewApplicants}
        >
          Review Applicants
        </Button>
      ) : (
        primaryAction && (
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            {isOwner && status === "listed" && (
              <button
                type="button"
                className="h-11 flex-1 rounded-lg border border-[#FF5D7A] text-sm text-[#FF5D7A] hover:bg-[#FFF0F3]"
                onClick={() => onAction("remove")}
              >
                Remove Job Listing
              </button>
            )}
            {!isOwner && status === "in-review" && (
              <button
                type="button"
                onClick={() => onAction("counter-offer")}
                className="h-11 flex-1 rounded-lg border border-[#FF9C2B] text-sm font-semibold text-[#FF9C2B] hover:bg-[#FFF6E9]"
              >
                Suggest Counter-Offer
              </button>
            )}
            {primaryAction === "withdraw" ? (
              <button
                type="button"
                onClick={() => onAction("withdraw")}
                className="h-11 flex-1 rounded-lg border border-[#FF5D7A] text-sm font-semibold text-[#FF5D7A] hover:bg-[#FFF0F3]"
              >
                Withdraw Application
              </button>
            ) : (
              <Button
                variant={primaryAction === "cancel" ? "danger" : "primary"}
                className="h-11 flex-1"
                onClick={() =>
                  onAction(
                    primaryAction,
                    primaryAction === "complete-milestone" && activeIndex >= 0
                      ? job.milestones[activeIndex].id
                      : undefined,
                  )
                }
              >
                {!isOwner && primaryAction === "accept"
                  ? "Accept Offer"
                  : jobActionLabels[primaryAction]}
              </Button>
            )}
          </div>
        )
      )}
    </article>
  );
}
