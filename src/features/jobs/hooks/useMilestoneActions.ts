import { useMemo, useState } from "react";
import { Milestone } from "../types";
import { initialMilestones } from "@/lib/constants/dummy";

const ITEMS_PER_PAGE = 3;
const MAX_MILESTONES = 5;

export const useMilestoneActions = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(milestones.length / ITEMS_PER_PAGE);

  const paginatedMilestones = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return milestones.slice(start, start + ITEMS_PER_PAGE);
  }, [milestones, page]);

  const toggleCollapse = (id: string) => {
    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.id === id
          ? {
              ...milestone,
              isExpanded: !milestone.isExpanded,
            }
          : milestone,
      ),
    );
  };

  return {
    toggleCollapse,
    MAX_MILESTONES,
    setPage,
    page,
    totalPages,
    paginatedMilestones,
    ITEMS_PER_PAGE,
  };
};
