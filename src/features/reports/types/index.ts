import { DonutSegment } from "@/components/molecules/DonutChart/DonutChart";

export type ReportTab = "jobs" | "finance" | "trade" | "insights";

export interface ReportLegendItem {
  label: string;
  value: string;
  color: string;
}

export interface ChartReportData {
  id: string;
  tab: ReportTab;
  title: string;
  subtitle: string;
  periodLabel: string;
  segments: DonutSegment[];
  centerValue: string;
  centerLabel?: string;
  legends: ReportLegendItem[];
  actionLabel?: string;
  actionHref?: string;
  hasRecords?: boolean;
  currencyOptions?: string[];
  views?: ReportChartView[];
}

export interface ReportChartView {
  value: string;
  label: string;
  centerValue: string;
  centerLabel?: string;
  segments: DonutSegment[];
  legends: ReportLegendItem[];
}
