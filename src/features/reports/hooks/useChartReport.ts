import { useState, type MouseEvent } from "react";
import { reportRanges } from "../constants/options";
import type { ChartReportData } from "../types";
export const useChartReport = (report: ChartReportData, onCurrencyChange: (currency: string) => void, period: string) => {
  const [viewValue, setViewValue] = useState(report.views?.[0]?.value ?? "");
  const view = report.views?.find((item) => item.value === viewValue);
  const selectView = (event: MouseEvent<HTMLButtonElement>) => setViewValue(event.currentTarget.dataset.value ?? "");
  const selectCurrency = (event: MouseEvent<HTMLButtonElement>) => onCurrencyChange(event.currentTarget.dataset.value ?? "");
  return { periodOptions: reportRanges.filter((item) => item.value !== "custom" || period === "Date range").map((item) => item.label), viewValue, view, selectView, selectCurrency,
    segments: view?.segments ?? report.segments, legends: view?.legends ?? report.legends,
    centerValue: view?.centerValue ?? report.centerValue, centerLabel: view?.centerLabel ?? report.centerLabel,
    hasRecords: view ? Number(view.centerValue.replaceAll(",", "")) > 0 : report.hasRecords };
};
