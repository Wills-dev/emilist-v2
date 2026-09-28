"use client";

import MilestoneCard from "../MilestoneCard/MilestoneCard";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";

import { useMilestoneActions } from "../../hooks/useMilestoneActions";
import type { JobDetailsViewModel } from "../../types";

const JobMilestoneInfo = ({
  variant = "public",
  milestones,
  managed = false,
  onReview,
  onComplete,
}: {
  onComplete?: (id: string) => void;
  managed?: boolean;
  onReview?: (id: string) => void;
  variant?: "public" | "dashboard";
  milestones: JobDetailsViewModel["milestones"];
}) => {
  const {
    toggleCollapse,
    setPage,
    page,
    ITEMS_PER_PAGE,
    paginatedMilestones,
    totalPages,
  } = useMilestoneActions(milestones);

  return (
    <div
      id="milestone"
      className={`w-full min-w-72.5 rounded-[11.33px] border-[0.94px] space-y-6 ${
        variant === "dashboard"
          ? "xl:max-w-87.75 border-[#ECECEC] bg-[#F9F9F9] py-6 px-2 sm:px-3"
          : "border-[#F1F2F9] bg-[#F6F7F9] pt-8 pb-6 px-2 sm:px-5"
      }`}
    >
      {managed && milestones.length === 0 && (
        <p className="px-2 text-sm text-[#707471]">
          No milestones have been added.
        </p>
      )}
      {paginatedMilestones?.map((milestone, index) => {
        const milestoneNumber = (page - 1) * ITEMS_PER_PAGE + index + 1;
        return (
          <MilestoneCard
            key={milestone?.id}
            id={milestone?.id}
            title={managed ? milestone.title : undefined}
            status={
              managed
                ? milestone.status
                    ?.trim()
                    .toLowerCase()
                    .replace(/[ _]+/g, "-") || "pending"
                : undefined
            }
            onComplete={onComplete ? () => onComplete(milestone.id) : undefined}
            onReview={onReview ? () => onReview(milestone.id) : undefined}
            isExpanded={milestone?.isExpanded}
            amount={milestone?.amount}
            currency={milestone.currency || "NGN"}
            details={milestone.details}
            milestoneNumber={milestoneNumber}
            duration={milestone?.duration}
            toggleCollapse={toggleCollapse}
          />
        );
      })}
      {((managed && milestones.length > 0) || totalPages > 1) && (
        <PaginationPanel
          totalPages={totalPages}
          page={page}
          onNext={() => setPage((prev) => prev + 1)}
          onPrev={() => setPage((prev) => prev - 1)}
        />
      )}
    </div>
  );
};

export default JobMilestoneInfo;
