import { useMemo, useState } from "react";
import { Milestone } from "../types";

const ITEMS_PER_PAGE = 3;
const MAX_MILESTONES = 5;

export const useMilestoneActions = (initialMilestones: Milestone[]) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(initialMilestones.filter(({ isExpanded }) => isExpanded).map(({ id }) => id)),
  );

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(initialMilestones.length / ITEMS_PER_PAGE);

  const paginatedMilestones = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return initialMilestones.slice(start, start + ITEMS_PER_PAGE).map((milestone) => ({
      ...milestone,
      isExpanded: expandedIds.has(milestone.id),
    }));
  }, [expandedIds, initialMilestones, page]);

  const toggleCollapse = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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
