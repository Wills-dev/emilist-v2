"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import InsightEmptyState from "@/components/atoms/icons/InsightEmptyState";
import { routes } from "@/lib/helpers/routes";
import {
  InsightReportData,
  InsightReportPeriod,
} from "../../types";

import ChartLegend from "../ChartLegend/ChartLegend";
import JobCompletionChart, {
  JOB_COMPLETION_SEGMENTS,
} from "../JobCompletionChart/JobCompletionChart";

const PERIOD_OPTIONS: Array<{
  value: InsightReportPeriod;
  label: string;
}> = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
];

const JobCompletionCard = ({
  dataByPeriod,
  emptyTitle = "No data reports yet",
}: {
  dataByPeriod?: InsightReportData;
  emptyTitle?: string;
}) => {
  const [period, setPeriod] = useState<InsightReportPeriod>("week");

  if (!dataByPeriod) {
    return (
      <section className="flex min-h-66.75 flex-col items-center bg-white p-6 text-center">
        <h2 className="font-exo font-semibold max-sm:text-sm">{emptyTitle}</h2>
        <div className="flex h-full flex-1 items-center justify-center">
          <InsightEmptyState />
        </div>
      </section>
    );
  }

  const data = dataByPeriod[period];

  return (
    <section className="bg-white">
      <div className="px-7 pb-6 pt-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-exo font-semibold">Job Completion</h2>
          <div className="relative shrink-0">
            <select
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value as InsightReportPeriod)
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
          <JobCompletionChart data={data} />
        </div>

        <div className="space-y-2 text-sm text-[#667085]">
          {JOB_COMPLETION_SEGMENTS.map((segment) => (
            <ChartLegend
              key={segment.key}
              color={segment.color}
              label={segment.label}
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
