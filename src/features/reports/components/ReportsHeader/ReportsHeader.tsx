import { ArrowRight, Download, Search, X } from "lucide-react";
import MonthYearSelector from "@/components/molecules/MonthYearSelector/MonthYearSelector";
import SearchableSelect from "@/components/atoms/SearchableSelect/SearchableSelect";
import SegmentedTabs from "@/components/molecules/SegmentedTabs/SegmentedTabs";
import type { ReportsController } from "../../hooks/useReports";
import { reportRanges } from "../../constants/options";
import AnimatedReportDateRange from "../AnimatedReportDateRange/AnimatedReportDateRange";

const ReportsHeader = ({ controller }: { controller: ReportsController }) => (
  <div>
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
      <div className="flex flex-wrap items-center gap-2">
        <MonthYearSelector month={controller.filters.monthName} year={controller.filters.year} onMonthChange={controller.filters.changeMonth} onYearChange={controller.filters.changeYear} allowEmpty={false} />
        <div className="w-40"><SearchableSelect options={reportRanges} value={controller.filters.range} onValueChange={controller.filters.changeRange} ariaLabel="Report period" triggerClassName="bg-[#E5E7EB] text-[#474C48]" /></div>
        <button type="button" onClick={controller.clearFilters} className="flex h-8 items-center gap-1 rounded-lg px-2 text-xs text-[#667085] transition-colors hover:bg-[#FFF0F3] hover:text-[#FF5D7A] focus-visible:ring-2 focus-visible:ring-[#25C269]">
          <X className="size-3.5" aria-hidden="true" /> Clear filters
        </button>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button type="button" onClick={controller.exportCsv} disabled={controller.downloading || !controller.query.data} className="flex h-8 items-center gap-1 border-b border-[#303632] disabled:opacity-50"><Download className="size-3 sm:hidden" />Download CSV<ArrowRight className="size-3" /></button>
        <button type="button" onClick={controller.setTargets} disabled={!controller.query.data} className="flex h-8 items-center gap-1 border-b border-[#18A154] text-[#18A154] disabled:opacity-50">{controller.query.data?.insights.targets.configured ? "Review targets" : "Set targets"}<ArrowRight className="size-3" /></button>
      </div>
    </div>
    <AnimatedReportDateRange filters={controller.filters} />
    <section className="bg-white">
      <div className="border-b border-[#EAEEEB] px-5 py-5"><h1 className="font-exo text-lg font-semibold text-[#101828]">Reports and Insights</h1><p className="mt-1 text-xs text-[#667085]">{controller.query.data?.filters.label ?? "Select the report you want to view"}</p></div>
      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        {controller.tabs.length > 0 && <SegmentedTabs options={controller.tabs} value={controller.tab} onChange={controller.changeTab} ariaLabel="Report types" responsive={false} size="compact" />}
        <label className="flex h-9 w-full items-center gap-2 rounded-full bg-[#F6F7F9] px-4 sm:max-w-64"><Search className="size-4 text-[#737774]" /><input type="search" value={controller.search} onChange={controller.changeSearch} placeholder="Search report types" aria-label="Search report types" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
      </div>
    </section>
  </div>
);
export default ReportsHeader;
