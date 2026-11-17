"use client";

import SearchableSelect from "@/components/atoms/SearchableSelect/SearchableSelect";

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MonthYearSelector = ({ month, year, onMonthChange, onYearChange, years, allowEmpty = true }: {
  month?: string;
  year?: number;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number | undefined) => void;
  years?: number[];
  allowEmpty?: boolean;
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = years ?? Array.from({ length: 21 }, (_, index) => currentYear - index);
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="w-36">
        <SearchableSelect
          triggerClassName="bg-[#E5E7EB] text-[#474C48] hover:bg-[#DDE1E6]"
          options={[...(allowEmpty ? [{ label: "All months", value: "" }] : []), ...MONTHS.map((label) => ({ label, value: label }))]}
          value={month ?? ""} onValueChange={onMonthChange}
          placeholder="All months" searchPlaceholder="Find month…" ariaLabel="Filter by month"
        />
      </div>
      <div className="w-24">
        <SearchableSelect
          triggerClassName="bg-[#E5E7EB] text-[#474C48] hover:bg-[#DDE1E6]"
          options={[...(allowEmpty ? [{ label: "All years", value: "" }] : []), ...Array.from(new Set([...yearOptions, ...(year ? [year] : [])])).sort((a, b) => b - a).map((value) => ({ label: String(value), value: String(value) }))]}
          value={year ? String(year) : ""} onValueChange={(value) => onYearChange(value ? Number(value) : undefined)}
          placeholder="All years" searchPlaceholder="Find year…" ariaLabel="Filter by year"
        />
      </div>
    </div>
  );
};

export default MonthYearSelector;
