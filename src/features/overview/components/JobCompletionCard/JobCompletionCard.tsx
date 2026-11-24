"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import InsightEmptyState from "@/components/atoms/icons/InsightEmptyState/InsightEmptyState";
import { routes } from "@/lib/helpers/routes";
import type { DashboardOverview, DashboardPeriod } from "../../types/api";

import ChartLegend from "../ChartLegend/ChartLegend";
import JobCompletionChart, {
  JOB_COMPLETION_SEGMENTS,
} from "../JobCompletionChart/JobCompletionChart";

const PERIOD_OPTIONS: Array<{
  value: DashboardPeriod;
  label: string;
}> = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
  { value: "all", label: "All time" },
];

const JobCompletionCard = ({ data, period, onPeriodChange, loading }: {
  data: DashboardOverview["jobCompletion"];
  period: DashboardPeriod;
  onPeriodChange: (period: DashboardPeriod) => void;
  loading: boolean;
}) => {
  return (
    <section className="bg-white" aria-busy={loading}>
      <div className="px-7 pb-6 pt-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-exo font-semibold">Job Completion</h2>
          <div className="relative shrink-0">
            <select
              value={period}
              onChange={(event) =>
                onPeriodChange(event.target.value as DashboardPeriod)
              }
              aria-label="Filter job completion report by period"
              className="h-12 appearance-none rounded-2xl border-0 bg-[#FAFAFA] py-2 pl-4 pr-11 text-sm text-[#737774] outline-none focus-visible:ring-2 focus-visible:ring-[#18A154]"
            >
              {PERIOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#202522]" />
          </div>
        </div>

        <div className="mt-5">
          {loading ? <p role="status" className="py-12 text-center text-sm">Loading report…</p> : data.counts.total === 0 ? <div className="flex flex-col items-center gap-3 py-6"><InsightEmptyState /><p className="text-sm">No jobs in this period.</p></div> : <JobCompletionChart data={data} />}
        </div>

        <div className="space-y-2 text-sm text-[#667085]">
          {JOB_COMPLETION_SEGMENTS.map((segment) => (
            <ChartLegend
              key={segment.key}
              color={segment.color}
              label={`${segment.label} (${data.counts[segment.key]})`}
            />
          ))}
        </div>
      </div>

      <Link
        href={routes.dashboardLinks.jobs}
        className="flex justify-end gap-2 border-t border-[#ECECEC] px-7 py-5 text-sm text-[#6667FF]"
      >
        View all <ArrowRight className="size-4" />
      </Link>
    </section>
  );
};

export default JobCompletionCard;
