"use client";

import { useState } from "react";

import DonutChart from "@/components/molecules/DonutChart/DonutChart";

import { ChartReportData } from "../../types";
import {
  filterReportByPeriod,
  getReportPeriodOptions,
} from "../../utils/reportFilters";
import {
  formatReportCurrency,
  ReportCurrency,
} from "../../utils/currency";
import ReportCard from "../ReportCard/ReportCard";
import ReportLegendGrid from "../ReportLegendGrid/ReportLegendGrid";

const ChartReportCard = ({ report }: { report: ChartReportData }) => {
  const [period, setPeriod] = useState(report.periodLabel);
  const [viewValue, setViewValue] = useState(report.views?.[0]?.value ?? "");
  const [currency, setCurrency] = useState<ReportCurrency>("NGN");
  const view = report.views?.find((option) => option.value === viewValue);
  const filteredReport = filterReportByPeriod(report, view, period);
  const financeLegends = report.currencyOptions
    ? filteredReport.legends.map((legend, index) => ({
        ...legend,
        value: formatReportCurrency(
          (filteredReport.segments[index]?.value ?? 0) * 1000,
          currency,
        ),
      }))
    : filteredReport.legends;
  const financeTotal = report.currencyOptions
    ? formatReportCurrency(
        Number(filteredReport.centerValue.replace(/[^\d.]/g, "")),
        currency,
      )
    : filteredReport.centerValue;
  const chartSegments = filteredReport.segments.map((segment) => ({
    ...segment,
    displayValue:
      financeLegends.find((legend) => legend.label === segment.label)?.value ??
      segment.value.toLocaleString(),
  }));

  return (
    <ReportCard
      title={report.title}
      subtitle={filteredReport.subtitle}
      periodLabel={period}
      periodOptions={getReportPeriodOptions(report.periodLabel)}
      onPeriodChange={setPeriod}
      actionLabel={report.actionLabel}
    >
      <div className="w-full">
        {report.views && (
          <div
            role="group"
            aria-label={`${report.title} chart view`}
            className="mb-4 flex flex-wrap gap-5 text-[10px] text-[#555B57]"
          >
            {report.views.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setViewValue(option.value)}
                className="flex items-center gap-1"
                aria-pressed={viewValue === option.value}
              >
                <span
                  className={`size-2 rounded-full border ${
                    viewValue === option.value
                      ? "border-[#25C269] bg-[#25C269]"
                      : "border-[#737774]"
                  }`}
                />
                {option.label}
              </button>
            ))}
          </div>
        )}

        {report.currencyOptions && (
          <div className="mb-3 flex flex-wrap gap-4 text-[10px] text-[#555B57]">
            {report.currencyOptions.map((currencyOption) => (
              <button
                key={currencyOption}
                type="button"
                onClick={() => setCurrency(currencyOption as ReportCurrency)}
                aria-pressed={currency === currencyOption}
                className="flex items-center gap-1"
              >
                <span
                  className={`size-2 rounded-full border ${
                    currency === currencyOption
                      ? "border-[#25C269] bg-[#25C269]"
                      : "border-[#737774]"
                  }`}
                />
                {currencyOption}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <DonutChart
            segments={chartSegments}
            centerValue={financeTotal}
            centerLabel={filteredReport.centerLabel}
            ariaLabel={`${report.title} report chart for ${period}`}
          />
          <ReportLegendGrid items={financeLegends} />
        </div>
      </div>
    </ReportCard>
  );
};

export default ChartReportCard;
