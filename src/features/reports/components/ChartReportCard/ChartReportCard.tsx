"use client";

import DonutChart from "@/components/molecules/DonutChart/DonutChart";
import InsightEmptyState from "@/components/atoms/icons/InsightEmptyState/InsightEmptyState";
import type { ChartReportData } from "../../types";
import { useChartReport } from "../../hooks/useChartReport";
import ReportCard from "../ReportCard/ReportCard";
import ReportLegendGrid from "../ReportLegendGrid/ReportLegendGrid";

const ChartReportCard = ({ report, period, currency, onPeriodChange, onCurrencyChange }: {
  report: ChartReportData; period: string; currency: string;
  onPeriodChange: (value: string) => void; onCurrencyChange: (value: string) => void;
}) => {
  const chart = useChartReport(report, onCurrencyChange, period);
  return (
    <ReportCard title={report.title} subtitle={report.subtitle} periodLabel={period}
      periodOptions={chart.periodOptions} onPeriodChange={onPeriodChange}
      actionLabel={report.actionLabel} actionHref={report.actionHref}>
      <div className="w-full">
        {report.views && <div role="group" aria-label={`${report.title} chart view`} className="mb-4 flex flex-wrap gap-5 text-[10px] text-[#555B57]">
          {report.views.map((option) => <button key={option.value} data-value={option.value} type="button" onClick={chart.selectView} aria-pressed={chart.viewValue === option.value} className="flex items-center gap-1">
            <span className={`size-2 rounded-full border ${chart.viewValue === option.value ? "border-[#25C269] bg-[#25C269]" : "border-[#737774]"}`} />{option.label}
          </button>)}
        </div>}
        {report.currencyOptions && <div role="group" aria-label="Report currency" className="mb-3 flex flex-wrap gap-4 text-[10px] text-[#555B57]">
          {report.currencyOptions.map((value) => <button key={value} data-value={value} type="button" onClick={chart.selectCurrency} aria-pressed={currency === value} className="flex items-center gap-1">
            <span className={`size-2 rounded-full border ${currency === value ? "border-[#25C269] bg-[#25C269]" : "border-[#737774]"}`} />{value}
          </button>)}
        </div>}
        {chart.hasRecords ? <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <DonutChart segments={chart.segments} centerValue={chart.centerValue} centerLabel={chart.centerLabel} ariaLabel={`${report.title} report: ${report.subtitle}`} />
          <ReportLegendGrid items={chart.legends} />
        </div> : <div className="flex flex-col items-center gap-5 py-6 text-center"><InsightEmptyState /><strong className="font-exo text-sm text-[#474C48]">No records found</strong></div>}
      </div>
    </ReportCard>
  );
};
export default ChartReportCard;
