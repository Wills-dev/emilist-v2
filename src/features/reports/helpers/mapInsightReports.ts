import type { UserReport } from "../types/api";
import { buildChartReport, type ReportMetric } from "./buildChartReport";
export const mapInsightReports = (report: UserReport) => {
  const { overview, promotionDuration: promotion, clicks } = report.insights;
  const label = report.filters.label;
  const overviewMetrics: ReportMetric[] = [["Reach", overview.reach, "#18A154"], ["Saves", overview.saves, "#B7F88B"], ["Shares", overview.shares, "#83E7AB"], ["Clicks", overview.clicks, "#D7F8E4"], ["Contacts", overview.contacts, "#D8D8D8"]];
  const clickMetrics: ReportMetric[] = [["Tracked", clicks.trackedClicks, "#FF9933"], ["Promotion", clicks.promotionClicks, "#F0F1F1"]];
  if (clicks.limit !== null && clicks.remaining !== null) clickMetrics.push(["Remaining", clicks.remaining, "#B7F88B"]);
  return [
    buildChartReport("overview", "insights", "Overview", label, overview.impressions, overviewMetrics,
      { centerLabel: "Impressions", hasRecords: Object.values(overview).some((value) => value > 0) }),
    buildChartReport("promotion", "insights", "Promotion Duration", label, promotion.totalDays,
      [["Remaining", promotion.daysRemaining, "#FF5D7A"], ["Used", promotion.daysUsed, "#F0F1F1"]],
      { centerValue: `${promotion.daysRemaining.toLocaleString()} days`, centerLabel: "remaining", hasRecords: promotion.active || promotion.totalDays > 0 }),
    buildChartReport("clicks", "insights", "Clicks", label, clicks.total, clickMetrics, { centerLabel: "Clicks" }),
  ];
};
