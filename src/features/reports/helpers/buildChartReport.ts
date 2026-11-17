import type { ChartReportData, ReportChartView, ReportTab } from "../types";
export type ReportMetric = [label: string, value: number, color: string];
export const buildChartView = (value: string, label: string, total: number, metrics: ReportMetric[], format = (number: number) => number.toLocaleString("en-US")): ReportChartView => ({
  value, label, centerValue: format(total), centerLabel: label,
  segments: metrics.map(([name, number, color]) => ({ label: name, value: number, color, displayValue: format(number) })),
  legends: metrics.map(([name, number, color]) => ({ label: name, value: format(number), color })),
});
export const buildChartReport = (id: string, tab: ReportTab, title: string, subtitle: string, total: number, metrics: ReportMetric[], options: Partial<ChartReportData> = {}): ChartReportData => ({
  id, tab, title, subtitle, periodLabel: "Selected month", hasRecords: total > 0,
  ...buildChartView(id, title, total, metrics), ...options,
});
