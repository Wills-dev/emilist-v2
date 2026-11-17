import { useState, type ChangeEvent } from "react";
import type { FetchReportInput, ReportCurrency, ReportRange } from "../types/api";
import { MONTHS } from "@/components/molecules/MonthYearSelector/MonthYearSelector";
import { reportRanges } from "../constants/options";
export const useReportFilters = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [range, setRange] = useState<ReportRange>("month");
  const [currency, setCurrency] = useState<ReportCurrency>("NGN");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [applied, setApplied] = useState({ startDate: "", endDate: "" });
  const [customFallback, setCustomFallback] = useState<FetchReportInput>({ year, month, currency });
  const validDates = Boolean(start && end && start <= end);
  const input: FetchReportInput = range === "custom" ? applied.startDate ? { ...applied, currency } : { ...customFallback, currency } : { year, month, range, currency };
  const changeMonth = (value: string) => { setMonth(MONTHS.indexOf(value) + 1); setRange("month"); };
  const changeYear = (value: number | undefined) => { if (value) setYear(value); if (range !== "year") setRange("month"); };
  const changeRange = (value: string) => { if (reportRanges.some((option) => option.value === value)) { if (value === "custom" && range !== "custom") setCustomFallback(input); setRange(value as ReportRange); } };
  const changePeriod = (value: string) => { const option = reportRanges.find((item) => item.label === value); if (option) setRange(option.value); };
  const changeCurrency = (value: string) => { if (["NGN", "USD", "EUR", "GBP", "CAD"].includes(value)) setCurrency(value as ReportCurrency); };
  const changeStart = (event: ChangeEvent<HTMLInputElement>) => setStart(event.target.value);
  const changeEnd = (event: ChangeEvent<HTMLInputElement>) => setEnd(event.target.value);
  const clear = () => {
    const now = new Date();
    const defaults = { year: now.getFullYear(), month: now.getMonth() + 1, currency: "NGN" as const };
    setYear(defaults.year); setMonth(defaults.month); setCurrency(defaults.currency); setRange("month");
    setStart(""); setEnd(""); setApplied({ startDate: "", endDate: "" }); setCustomFallback(defaults);
  };
  const applyDates = () => { if (validDates) setApplied({ startDate: start, endDate: end }); };
  return { year, month, monthName: MONTHS[month - 1], range, currency, start, end, validDates, input,
    periodLabel: reportRanges.find((option) => option.value === range)?.label ?? "Selected month",
    changeMonth, changeYear, changeRange, changePeriod, changeCurrency, changeStart, changeEnd, applyDates, clear };
};
export type ReportFilterController = ReturnType<typeof useReportFilters>;
