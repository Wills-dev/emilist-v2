import { ArrowRight, Download, MoreVertical, Search } from "lucide-react";

import SegmentedTabs from "@/components/molecules/SegmentedTabs/SegmentedTabs";

import { reportTabs } from "../../constants/dummyReports";
import { ReportTab } from "../../types";

const ReportsHeader = ({
  tab,
  search,
  onTabChange,
  onSearchChange,
  onDownload,
  onSetTargets,
}: {
  tab: ReportTab;
  search: string;
  onTabChange: (tab: ReportTab) => void;
  onSearchChange: (search: string) => void;
  onDownload: () => void;
  onSetTargets: () => void;
}) => (
  <div className="space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <select
          defaultValue="April"
          aria-label="Report month"
          className="h-9 bg-white px-3 text-sm text-[#737774] outline-none"
        >
          <option>April</option>
          <option>March</option>
          <option>February</option>
        </select>
        <select
          defaultValue="2026"
          aria-label="Report year"
          className="h-9 bg-white px-3 text-sm text-[#737774] outline-none"
        >
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>

      <div className="flex items-center gap-5 text-xs">
        <button
          type="button"
          onClick={onDownload}
          className="flex items-center gap-1 border-b border-[#303632]"
        >
          <Download className="size-3 sm:hidden" /> Download CSV
          <ArrowRight className="size-3" />
        </button>
        <button
          type="button"
          onClick={onSetTargets}
          className="flex items-center gap-1 border-b border-[#18A154] text-[#18A154]"
        >
          Set targets <ArrowRight className="size-3" />
        </button>
      </div>
    </div>

    <section className="bg-white">
      <div className="flex items-start justify-between border-b border-[#EAEEEB] px-5 py-5">
        <div>
          <h1 className="font-exo text-lg font-semibold text-[#101828]">
            Reports and Insights
          </h1>
          <p className="mt-1 text-xs text-[#667085]">
            Select the report you want to view
          </p>
        </div>
        <button
          type="button"
          aria-label="More report options"
          className="rounded-lg border border-[#E8EBE9] p-2 text-[#737774]"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <SegmentedTabs
          options={reportTabs}
          value={tab}
          onChange={onTabChange}
          ariaLabel="Report types"
          responsive={false}
          size="compact"
        />

        <label className="flex h-9 w-full items-center gap-2 rounded-full bg-[#F6F7F9] px-4 sm:max-w-64">
          <Search className="size-4 text-[#737774]" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
      </div>
    </section>
  </div>
);

export default ReportsHeader;
