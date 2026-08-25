"use client";

import { useState } from "react";
import { Ban, CheckCircle2, CircleCheck, RotateCcw } from "lucide-react";

import type { JobStat } from "../../types/manageJobs";
import JobStatCard from "../JobStatCard/JobStatCard";

const STAT_ICONS = {
  overdue: Ban,
  pending: RotateCcw,
  active: CheckCircle2,
  completed: CircleCheck,
} as const;

const jobStats: JobStat[] = [
  { id: "overdue", label: "Overdue jobs", tone: "danger", context: "2 milestones missed", value: 1, trend: "2%", day: "Friday" },
  { id: "pending", label: "Pending jobs", tone: "warning", context: "2 issues raised", value: 3, trend: "2%", day: "Friday" },
  { id: "active", label: "Active jobs", tone: "success", context: "3 milestones left", value: 3, trend: "2%", day: "Friday" },
  { id: "completed", label: "Completed jobs", tone: "neutral", context: "6 milestones completed", value: 3, trend: "2%", day: "Friday" },
];

const JobStatsRow = () => {
  const [days, setDays] = useState<Record<string, string>>(
    Object.fromEntries(jobStats.map((stat) => [stat.id, stat.day])),
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {jobStats.map((stat) => (
        <JobStatCard
          key={stat.id}
          stat={stat}
          icon={STAT_ICONS[stat.id as keyof typeof STAT_ICONS]}
          day={days[stat.id]}
          onDayChange={(day) => setDays((prev) => ({ ...prev, [stat.id]: day }))}
        />
      ))}
    </div>
  );
};

export default JobStatsRow;
