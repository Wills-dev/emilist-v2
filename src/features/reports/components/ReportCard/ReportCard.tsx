import Link from "next/link";
import { useReportCard } from "../../hooks/useReportCard";
import { ChevronDown } from "lucide-react";

const ReportCard = ({
  title,
  subtitle,
  periodLabel,
  periodOptions,
  onPeriodChange,
  children,
  actionLabel,
  onAction,
  actionHref,
}: {
  title: string;
  subtitle: string;
  periodLabel: string;
  periodOptions?: string[];
  onPeriodChange?: (period: string) => void;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}) => {
  const { changePeriod } = useReportCard(onPeriodChange);
  return (
  <section className="flex min-h-96 flex-col bg-white p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-exo font-semibold text-[#101828]">{title}</h2>
        <p className="mt-2 text-xs text-[#737774]">{subtitle}</p>
      </div>
      {onPeriodChange ? <label className="relative shrink-0">
        <span className="sr-only">Filter {title} report by period</span>
        <select
          value={periodLabel}
          onChange={changePeriod}
          className="h-9 appearance-none rounded-full border border-[#E5E7E6] bg-white py-2 pl-4 pr-10 text-xs text-[#101828] outline-none focus-visible:ring-2 focus-visible:ring-[#18A154]"
        >
          {(periodOptions ?? [periodLabel]).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2" />
      </label> : <span className="shrink-0 rounded-full border border-[#E5E7E6] px-3 py-2 text-xs">{periodLabel}</span>}
    </div>

    <div className="mt-5 flex flex-1 items-center justify-center rounded-xl bg-[#FAFAFA] p-4">
      {children}
    </div>

    {actionLabel && (
      actionHref ? <Link href={actionHref} className="mt-4 w-full rounded-full border border-[#E5E7E6] py-2 text-center text-xs text-[#101828]">{actionLabel}</Link> : <button
        type="button"
        onClick={onAction}
        className={`mt-4 w-full rounded-full text-xs ${
          actionLabel.startsWith("+")
            ? "text-right text-[#6667FF] underline"
            : "border border-[#E5E7E6] py-2 text-[#101828]"
        }`}
      >
        {actionLabel}
      </button>
    )}
  </section>
  );
};

export default ReportCard;
