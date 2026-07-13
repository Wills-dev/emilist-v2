"use client";

import MilestoneCard from "../MilestoneCard/MilestoneCard";
import PaginationControls from "@/components/atoms/PaginationControls/PaginationControls";

import { useMilestoneActions } from "../../hooks/useMilestoneActions";

const JobMilestoneInfo = () => {
  const {
    toggleCollapse,
    setPage,
    page,
    ITEMS_PER_PAGE,
    paginatedMilestones,
    totalPages,
  } = useMilestoneActions();

  return (
    <div
      id="milestone"
      className="w-full min-w-72.5 border-[0.94px] border-[#F1F2F9] pt-8 pb-6 sm:px-5 px-2 bg-[#F6F7F9] rounded-[11.33px] space-y-6"
    >
      {paginatedMilestones?.map((milestone, index) => {
        const milestoneNumber = (page - 1) * ITEMS_PER_PAGE + index + 1;
        return (
          <MilestoneCard
            key={milestone?.id}
            id={milestone?.id}
            isExpanded={milestone?.isExpanded}
            title={milestone?.title}
            amount={milestone?.amount}
            currency="NGN"
            details={milestone.details}
            milestoneNumber={milestoneNumber}
            duration={milestone?.duration}
            toggleCollapse={toggleCollapse}
          />
        );
      })}
      <div className="pt-6 border-t border-[#ECECEC] flex items-center justify-between">
        <div className="space-y-2.5">
          <p className="w-fit text-xs text-[#707471]">Page</p>
          <p className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-white border border-[#F1F2F9] text-sm font-medium text-[#010156]">
            {page}
          </p>
        </div>
        <PaginationControls
          disableNext={page === totalPages}
          disablePrev={page === 1}
          prev={() => setPage((prev) => prev - 1)}
          next={() => setPage((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};

export default JobMilestoneInfo;
