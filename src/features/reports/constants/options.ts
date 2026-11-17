import type { ReportTab } from "../types";
import type { ReportRange } from "../types/api";
export const reportTabs: { value: ReportTab; label: string }[] = [
  { value: "jobs", label: "Jobs" }, { value: "finance", label: "Finance" },
  { value: "trade", label: "Trade" }, { value: "insights", label: "Insights" },
];
export const reportRanges: { value: ReportRange; label: string }[] = [
  { value: "month", label: "Selected month" }, { value: "year", label: "Selected year" },
  { value: "last7days", label: "Last 7 days" }, { value: "last30days", label: "Last 30 days" },
  { value: "last90days", label: "Last 90 days" }, { value: "custom", label: "Date range" },
];
