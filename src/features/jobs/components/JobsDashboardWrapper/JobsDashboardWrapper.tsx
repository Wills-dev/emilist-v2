"use client";

import { useState } from "react";

import Container from "@/components/atoms/Container/Container";

import JobStatsRow from "../JobStatsRow/JobStatsRow";
import JobsPageHeader from "../JobsPageHeader/JobsPageHeader";
import ManageJobsPanel from "../ManageJobsPanel/ManageJobsPanel";

const JobsDashboardWrapper = () => {
  const now = new Date();
  const [month, setMonth] = useState(
    now.toLocaleString("en-US", { month: "long" }),
  );
  const [year, setYear] = useState(now.getFullYear());

  return (
    <Container variant="small" className="space-y-4 py-4">
      <JobsPageHeader
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />
      <JobStatsRow />
      <ManageJobsPanel />
    </Container>
  );
};

export default JobsDashboardWrapper;
