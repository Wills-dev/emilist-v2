"use client";

import MilestoneCard from "../MilestoneCard/MilestoneCard";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";

import { useMilestoneActions } from "../../hooks/useMilestoneActions";
import type { JobDetailsViewModel } from "../../types";

const JobMilestoneInfo = ({
  variant = "public",
  milestones,
}: {
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
          ? "max-w-87.75 border-[#ECECEC] bg-[#F9F9F9] py-6 px-2 sm:px-3"
          : "border-[#F1F2F9] bg-[#F6F7F9] pt-8 pb-6 px-2 sm:px-5"
      }`}
    >
      {paginatedMilestones?.map((milestone, index) => {
        const milestoneNumber = (page - 1) * ITEMS_PER_PAGE + index + 1;
        return (
          <MilestoneCard
            key={milestone?.id}
            id={milestone?.id}
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
      {totalPages > 1 && (
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
