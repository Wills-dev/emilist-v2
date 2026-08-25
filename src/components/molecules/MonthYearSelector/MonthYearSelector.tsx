const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const buildYearOptions = (currentYear: number, span = 4) =>
  Array.from({ length: span }, (_, index) => currentYear - index);

const MonthYearSelector = ({
  month,
  year,
  onMonthChange,
  onYearChange,
  years,
}: {
  month: string;
  year: number;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number) => void;
  years?: number[];
}) => {
  const yearOptions = years ?? buildYearOptions(year);

  return (
    <div className="flex items-center gap-2">
      <select
        value={month}
        onChange={(event) => onMonthChange(event.target.value)}
        aria-label="Select month"
        className="h-9 rounded-lg border border-[#E5E7E6] bg-white px-3 text-sm text-[#737774] outline-none"
      >
        {MONTHS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        value={year}
        onChange={(event) => onYearChange(Number(event.target.value))}
        aria-label="Select year"
        className="h-9 rounded-lg border border-[#E5E7E6] bg-white px-3 text-sm text-[#737774] outline-none"
      >
        {yearOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearSelector;
