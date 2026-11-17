import { routes } from "@/lib/helpers/routes";
import type { UserReport, ApplicationSummary } from "../types/api";
import { buildChartReport, buildChartView, type ReportMetric } from "./buildChartReport";
import { formatReportCurrency } from "../utils/currency";

const applicationMetrics = (value: ApplicationSummary, flagged: boolean): ReportMetric[] => [
  ["Hired", value.hired, "#8EA2FF"], ["Re-hired", value.rehired, "#6667FF"],
  ["Pending", value.pending, "#E7E7E7"], ["Rejected", value.rejected, "#FF9933"],
  ...(flagged ? [["Flagged", value.flagged, "#FF5D7A"] as ReportMetric] : []),
];
export const mapCoreReports = (report: UserReport) => {
  const label = report.filters.label;
  const applicants = buildChartView("applicants", "Applicants", report.applications.applicants.total, applicationMetrics(report.applications.applicants, report.applications.flaggedTrackingAvailable));
  const mine = buildChartView("my-applications", "My Applications", report.applications.myApplications.total, applicationMetrics(report.applications.myApplications, report.applications.flaggedTrackingAvailable));
  const money = (value: number) => formatReportCurrency(value, report.finance.currency);
  return [
    buildChartReport("jobs", "jobs", "Jobs", label, report.jobs.total, [
      ["Active", report.jobs.active, "#138A46"], ["Pending", report.jobs.pending, "#FF9933"],
      ["Completed", report.jobs.completed, "#D8D8D8"], ["Overdue", report.jobs.overdue, "#FF5D7A"],
    ], { hasRecords: report.jobs.hasRecords, actionLabel: "Manage Jobs", actionHref: routes.dashboardLinks.jobs }),
    buildChartReport("applications", "jobs", "Applications", label, report.applications.applicants.total, [], {
      ...applicants, id: "applications", views: [applicants, mine], hasRecords: report.applications.applicants.total > 0,
    }),
    ...(["earnings", "expenses"] as const).map((type) => {
      const value = report.finance[type];
      const metrics: ReportMetric[] = Object.entries(value.categories).map(([key, amount], index) => [key.charAt(0).toUpperCase() + key.slice(1), amount, (type === "earnings" ? ["#18A154", "#B7F88B", "#B8F2CF", "#E5E7E6"] : ["#FF5D7A", "#FFC4CE", "#FFDDE3", "#FFF0F3"])[index % 4]]);
      const view = buildChartView(type, type === "earnings" ? "Earned" : "Spent", value.total, metrics, money);
      return buildChartReport(type, "finance", type === "earnings" ? "Earnings" : "Expenses", label, value.total, [], { ...view, currencyOptions: report.finance.availableCurrencies });
    }),
    ...(["orders", "sales"] as const).map((type) => {
      const value = report.trade[type];
      const entries: ReportMetric[] = [["Completed", value.completed, "#138A46"], ["Pending", value.pending, "#B7F88B"], ["Cancelled", value.cancelled, "#E7E7E7"], ["Returned", value.returned, "#FF5D7A"]];
      if (type === "sales") entries.splice(1, 0, ["Ongoing", report.trade.sales.ongoing, "#83E7AB"]);
      return buildChartReport(type, "trade", type === "orders" ? "Orders" : "Sales", label, value.total, entries,
        { actionLabel: type === "orders" ? "Manage Orders" : "Manage Listed Items", actionHref: type === "orders" ? routes.dashboardLinks.orders : routes.dashboardLinks.listedMaterials });
    }),
  ];
};
