"use client";

import MilestoneCard from "../MilestoneCard/MilestoneCard";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";

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
      <PaginationPanel
        totalPages={totalPages}
        page={page}
        onNext={() => setPage((prev) => prev + 1)}
        onPrev={() => setPage((prev) => prev - 1)}
      />
    </div>
  );
};

export default JobMilestoneInfo;
