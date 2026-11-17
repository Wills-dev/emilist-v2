"use client";

import { BriefcaseBusiness, CheckCircle2, CircleCheck, Ban } from "lucide-react";
import { useJobAnalytics } from "../../hooks/useJobAnalytics";
import type { JobAnalyticsQuery } from "../../types/jobAnalytics";
import JobStatCard from "../JobStatCard/JobStatCard";
import JobStatsRowSkeleton from "./JobStatsRowSkeleton";

const stats = [
  { id: "totalJobs", label: "Total jobs", tone: "neutral", icon: BriefcaseBusiness },
  { id: "totalOverdueJobs", label: "Overdue jobs", tone: "danger", icon: Ban },
  { id: "totalActiveJobs", label: "Active jobs", tone: "success", icon: CheckCircle2 },
  { id: "totalCompletedJobs", label: "Completed jobs", tone: "neutral", icon: CircleCheck },
] as const;

const JobStatsRow = ({ query }: { query: JobAnalyticsQuery }) => {
  const analytics = useJobAnalytics(query);
  if (analytics.isPending) return <JobStatsRowSkeleton />;
  if (analytics.isError) return (
    <div role="alert" className="flex min-h-40 flex-wrap items-center justify-center gap-3 border border-[#F1F2F9] bg-white p-4 text-sm text-[#667085]">
      Unable to load job analytics.
      <button type="button" disabled={analytics.isFetching} onClick={() => void analytics.refetch()} className="font-medium text-[#07883E] disabled:opacity-50">
        {analytics.isFetching ? "Retrying…" : "Try again"}
      </button>
    </div>
  );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ icon, ...stat }) => (
        <JobStatCard key={stat.id} stat={{ ...stat, value: analytics.data[stat.id] }} icon={icon} />
      ))}
    </div>
  );
};

export default JobStatsRow;
