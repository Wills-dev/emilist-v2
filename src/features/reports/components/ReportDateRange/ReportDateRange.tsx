import CalendarDatePicker from "@/components/molecules/CalendarDatePicker/CalendarDatePicker";
import type { ReportFilterController } from "../../hooks/useReportFilters";
const ReportDateRange = ({ filters }: { filters: ReportFilterController }) => (
  <div className="flex flex-wrap items-end gap-3 rounded-lg bg-white p-3">
    <div className="w-44 space-y-1"><label htmlFor="report-start" className="text-xs text-[#667085]">Start date</label><CalendarDatePicker id="report-start" value={filters.start} max={filters.end || undefined} onChange={filters.changeStart} /></div>
    <div className="w-44 space-y-1"><label htmlFor="report-end" className="text-xs text-[#667085]">End date</label><CalendarDatePicker id="report-end" value={filters.end} min={filters.start || undefined} onChange={filters.changeEnd} /></div>
    <button type="button" disabled={!filters.validDates} onClick={filters.applyDates} className="h-11 rounded-lg bg-[#18A154] px-4 text-sm text-white disabled:opacity-50">Apply range</button>
  </div>
);
export default ReportDateRange;
