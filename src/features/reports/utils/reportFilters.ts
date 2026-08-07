import { ChartReportData, ReportChartView } from "../types";

export const getReportPeriodOptions = (periodLabel: string) =>
  periodLabel === "2026"
    ? ["2026", "2025", "2024"]
    : ["Last 7 days", "Last 30 days", "Last 90 days"];

const getPeriodScale = (period: string) => {
  if (period === "Last 7 days") return 0.35;
  if (period === "Last 90 days") return 1.65;
  if (period === "2025") return 0.78;
  if (period === "2024") return 0.6;
  return 1;
};

const scaleDisplayValue = (value: string, scale: number) => {
  if (scale === 1) return value;
  const numberMatch = value.match(/[\d,.]+/);
  if (!numberMatch) return value;

  const number = Number(numberMatch[0].replaceAll(",", ""));
  const scaledNumber = Math.max(0, Math.round(number * scale));
  return value.replace(numberMatch[0], scaledNumber.toLocaleString());
};

const getSubtitle = (period: string, fallback: string) => {
  if (period === "Last 7 days") return "From 25-31 March, 2026";
  if (period === "Last 90 days") return "From 1 January-31 March, 2026";
  if (/^20\d{2}$/.test(period)) return `From 1 January-31 December, ${period}`;
  return fallback;
};

export const filterReportByPeriod = (
  report: ChartReportData,
  view: ReportChartView | undefined,
  period: string,
) => {
  const scale = getPeriodScale(period);
  const sourceSegments = view?.segments ?? report.segments;
  const sourceLegends = view?.legends ?? report.legends;

  return {
    subtitle: getSubtitle(period, report.subtitle),
    centerValue: scaleDisplayValue(
      view?.centerValue ?? report.centerValue,
      scale,
    ),
    centerLabel: view?.centerLabel ?? report.centerLabel,
    segments: sourceSegments.map((segment, index) => ({
      ...segment,
      value:
        segment.value *
        scale *
        (1 + (index % 2 === 0 ? -0.08 : 0.12) * (scale - 1)),
    })),
    legends: sourceLegends.map((legend) => ({
      ...legend,
      value: scaleDisplayValue(legend.value, scale),
    })),
  };
};
