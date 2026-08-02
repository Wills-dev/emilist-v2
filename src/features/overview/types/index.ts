export interface DashboardMetric {
  id: string;
  title: string;
  value?: string;
  suffix?: string;
  context: string;
  change?: string;
  changeDirection?: "up" | "down";
  linkLabel: string;
  href: string;
}

export interface JobCompletionData {
  completed: number;
  pending: number;
  overdue: number;
}

export type InsightReportPeriod = "week" | "month" | "year";

export type InsightReportData = Record<
  InsightReportPeriod,
  JobCompletionData
>;
