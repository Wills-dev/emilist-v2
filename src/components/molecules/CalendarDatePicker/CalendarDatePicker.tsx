"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const toValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const toDate = (value?: string | number) =>
  value ? new Date(`${String(value)}T00:00:00`) : null;

const CalendarDatePicker = ({
  value,
  name,
  id,
  required,
  disabled,
  min,
  max,
  onChange,
}: {
  value?: string | number | readonly string[];
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const isControlled = typeof value === "string";
  const [internalValue, setInternalValue] = useState("");
  const selectedValue = isControlled ? value : internalValue;
  const selectedDate = selectedValue
    ? new Date(`${selectedValue}T00:00:00`)
    : null;
  const minDate = toDate(min);
  const maxDate = toDate(max);
  const minYear = minDate?.getFullYear() ?? 1900;
  const maxYear = maxDate?.getFullYear() ?? currentYear + 100;
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");
  const [viewDate, setViewDate] = useState(selectedDate ?? new Date());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const updatePlacement = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const bounds = trigger.getBoundingClientRect();
    const availableAbove = bounds.top;
    const availableBelow = window.innerHeight - bounds.bottom;
    const calendarHeight = 190;

    setPlacement(
      availableBelow < calendarHeight && availableAbove > availableBelow
        ? "top"
        : "bottom",
    );
  }, []);

  useEffect(() => {
    if (!open) return;

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);

    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open, updatePlacement]);
  const days = useMemo(() => {
    const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const start = new Date(
      first.getFullYear(),
      first.getMonth(),
      1 - ((first.getDay() + 6) % 7),
    );
    return Array.from(
      { length: 42 },
      (_, index) =>
        new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + index,
        ),
    );
  }, [viewDate]);

  const previousMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() - 1,
    1,
  );
  const nextMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    1,
  );
  const previousMonthEnd = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0,
  );
  const canViewPreviousMonth = !minDate || previousMonthEnd >= minDate;
  const canViewNextMonth = !maxDate || nextMonth <= maxDate;

  const selectDate = (date: Date) => {
    if (!hiddenInputRef.current) return;
    const nextValue = toValue(date);
    if (
      (minDate && date < minDate) ||
      (maxDate && date > maxDate)
    )
      return;

    if (!isControlled) setInternalValue(nextValue);
    hiddenInputRef.current.value = nextValue;
    onChange?.({
      target: hiddenInputRef.current,
      currentTarget: hiddenInputRef.current,
    } as ChangeEvent<HTMLInputElement>);
    setOpen(false);
  };

  return (
    <div className="relative focus-within:z-50">
      <input
        ref={hiddenInputRef}
        type="hidden"
        id={id}
        name={name}
        value={selectedValue}
        required={required}
        min={min}
        max={max}
        readOnly
      />
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => {
          updatePlacement();
          setOpen((current) => !current);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between rounded-[10px] bg-[#ECECEC] px-3 text-left text-sm text-[#737774] focus-visible:ring-2 focus-visible:ring-[#25C269]"
      >
        {selectedDate
          ? selectedDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Select date"}
        <CalendarDays className="size-4" />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Choose date"
          className={`absolute left-0 z-50 w-full max-w-52 rounded-lg bg-[#F3F3F3] p-1.5 shadow-xl ${placement === "top" ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"}`}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-1">
              <select
                value={viewDate.getMonth()}
                onChange={(event) =>
                  setViewDate(
                    new Date(
                      viewDate.getFullYear(),
                      Number(event.target.value),
                      1,
                    ),
                  )
                }
                aria-label="Select month"
                className="min-w-0 max-w-22 bg-transparent font-exo text-[10px] font-medium outline-none"
              >
                {months.map((month, index) => (
                  <option
                    key={month}
                    value={index}
                    disabled={Boolean(
                      (minDate &&
                        new Date(viewDate.getFullYear(), index + 1, 0) <
                          minDate) ||
                      (maxDate &&
                        new Date(viewDate.getFullYear(), index, 1) > maxDate)
                    )}
                  >
                    {month}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={viewDate.getFullYear()}
                min={minYear}
                max={maxYear}
                onChange={(event) =>
                  setViewDate(
                    new Date(
                      Math.min(
                        maxYear,
                        Math.max(minYear, Number(event.target.value)),
                      ),
                      viewDate.getMonth(),
                      1,
                    ),
                  )
                }
                aria-label="Select year"
                className="w-12 appearance-none bg-transparent font-exo text-[10px] font-medium outline-none"
              />
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Previous month"
                disabled={!canViewPreviousMonth}
                onClick={() =>
                  setViewDate(previousMonth)
                }
                className="disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={!canViewNextMonth}
                onClick={() =>
                  setViewDate(nextMonth)
                }
                className="disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7">
            {weekdays.map((day) => (
              <span
                key={day}
                className="py-1 text-center text-[10px] font-semibold text-[#656A66]"
              >
                {day}
              </span>
            ))}
            {days.map((date) => {
              const dateValue = toValue(date);
              const currentMonth = date.getMonth() === viewDate.getMonth();
              const isOutsideRange =
                Boolean(minDate && date < minDate) ||
                Boolean(maxDate && date > maxDate);
              return (
                <button
                  key={dateValue}
                  type="button"
                  disabled={isOutsideRange}
                  onClick={() => selectDate(date)}
                  className={`h-5 border border-white/60 text-[10px] disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[#B8B9B8] ${dateValue === selectedValue ? "bg-[#169BD5] text-white" : currentMonth ? "hover:bg-white" : "bg-white text-[#8A8D8B]"}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDatePicker;
