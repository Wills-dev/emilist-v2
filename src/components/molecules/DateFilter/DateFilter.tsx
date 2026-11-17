"use client";

import { useId, useState } from "react";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import MonthYearSelector, { MONTHS } from "../MonthYearSelector/MonthYearSelector";
import CalendarDatePicker from "../CalendarDatePicker/CalendarDatePicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";

export interface DateFilterValue {
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
}

const formatDate = (value: string) => new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function DateFilter({ value, onChange }: {
  value: DateFilterValue;
  onChange: (value: DateFilterValue) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const hasFilter = Boolean(value.year || value.month || value.startDate || value.endDate);
  const validRange = Boolean(start && end && start <= end);
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <MonthYearSelector
        month={value.month ? MONTHS[value.month - 1] : undefined}
        year={value.year}
        onMonthChange={(month) => onChange({ ...(value.year ? { year: value.year } : {}), ...(month ? { month: MONTHS.indexOf(month) + 1 } : {}) })}
        onYearChange={(year) => onChange({ ...(value.month ? { month: value.month } : {}), ...(year ? { year } : {}) })}
      />
      <Popover open={open} onOpenChange={(next) => {
        if (next) { setStart(value.startDate ?? ""); setEnd(value.endDate ?? ""); }
        setOpen(next);
      }}>
        <PopoverTrigger asChild>
          <button type="button" className="flex h-7.5 max-w-full items-center gap-2 rounded-[10px] bg-[#E5E7EB] px-3 text-xs text-[#474C48] hover:bg-[#DDE1E6] outline-none focus-visible:ring-2 focus-visible:ring-[#25C269]" aria-label="Filter by date range">
            <CalendarDays className="size-3.5 shrink-0" />
            <span className="truncate">{value.startDate && value.endDate ? `${formatDate(value.startDate)} – ${formatDate(value.endDate)}` : "Date range"}</span>
            <ChevronDown className="size-3.5 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" collisionPadding={16} className="w-80 max-w-[calc(100vw-2rem)] gap-4 bg-white p-4">
          <p className="font-medium text-[#303632]">Custom date range</p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label htmlFor={`${id}-start`} className="text-xs text-[#667085]">Start date</label>
              <CalendarDatePicker id={`${id}-start`} value={start} max={end || undefined} onChange={(event) => setStart(event.target.value)} placeholder="Select start date" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`${id}-end`} className="text-xs text-[#667085]">End date</label>
              <CalendarDatePicker id={`${id}-end`} value={end} min={start || undefined} onChange={(event) => setEnd(event.target.value)} placeholder="Select end date" />
            </div>
          </div>
          <p className="text-xs text-[#8A8D8B]">A date range replaces the month and year filters.</p>
          <button type="button" disabled={!validRange} onClick={() => {
            if (!validRange) return;
            onChange({ startDate: start, endDate: end }); setOpen(false);
          }} className="h-9 w-full rounded-lg bg-[#18A154] text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#25C269]">Apply range</button>
        </PopoverContent>
      </Popover>
      {hasFilter ? (
        <button type="button" onClick={() => { onChange({}); setStart(""); setEnd(""); setOpen(false); }} className="flex h-7.5 items-center gap-1 rounded-lg px-2 text-xs text-[#667085] hover:bg-[#FFF0F3] hover:text-[#FF5D7A] focus-visible:ring-2 focus-visible:ring-[#25C269]">
          <X className="size-3.5" /> Clear filters
        </button>
      ) : <span className="text-xs text-[#8A8D8B]">All time</span>}
    </div>
  );
}
