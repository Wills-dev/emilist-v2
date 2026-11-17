"use client";

import { useState } from "react";
import type { DateFilterValue } from "@/components/molecules/DateFilter/DateFilter";

import Container from "@/components/atoms/Container/Container";

import JobStatsRow from "../JobStatsRow/JobStatsRow";
import JobsPageHeader from "../JobsPageHeader/JobsPageHeader";
import ManageJobsPanel from "../ManageJobsPanel/ManageJobsPanel";

const JobsDashboardWrapper = () => {
  const [filters, setFilters] = useState<DateFilterValue>(() => {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  });

  return (
    <Container variant="small" className="space-y-4 py-4">
      <JobsPageHeader filters={filters} onFiltersChange={setFilters} />
      <JobStatsRow query={filters} />
      <ManageJobsPanel />
    </Container>
  );
};

export default JobsDashboardWrapper;
