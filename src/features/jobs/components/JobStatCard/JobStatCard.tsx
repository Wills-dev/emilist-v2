import { ChevronDown, LucideIcon, TrendingUp } from "lucide-react";
import clsx from "clsx";

import type { BadgeTone, JobStat } from "../../types/manageJobs";

const toneStyles: Record<BadgeTone, string> = {
  success: "bg-[#EAFBF1] text-[#07883E]",
  warning: "bg-[#FFF6E8] text-[#FF8A00]",
  danger: "bg-[#FFF0F3] text-[#FF5D7A]",
  neutral: "bg-[#F8F8F8] text-[#667085]",
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const JobStatCard = ({
  stat,
  icon: Icon,
  day,
  onDayChange,
}: {
  stat: JobStat;
  icon: LucideIcon;
  day: string;
  onDayChange: (day: string) => void;
}) => (
  <article className="flex min-h-40 flex-col justify-between border border-[#F1F2F9] bg-white p-4">
    <div className="flex items-center justify-between">
      <span
        className={clsx(
          "flex size-8 items-center justify-center rounded-full",
          toneStyles[stat.tone],
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>

      <div className="relative">
        <select
          value={day}
          onChange={(event) => onDayChange(event.target.value)}
          aria-label={`Day for ${stat.label}`}
          className="h-7 cursor-pointer appearance-none rounded-lg border border-[#E5E7E6] bg-white pl-2.5 pr-6 text-xs text-[#737774] outline-none"
        >
          {DAYS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 size-3 -translate-y-1/2 text-[#8A8D8B]" />
      </div>
    </div>

    <div>
      <p className="text-sm font-medium text-[#303632]">{stat.label}</p>
      <p className="mt-1 text-xs text-[#8A8D8B]">{stat.context}</p>
    </div>

    <div className="flex items-end gap-2">
      <strong className="font-exo text-2xl text-[#101828]">{stat.value}</strong>
      <span className="mb-0.5 flex items-center gap-0.5 text-xs text-[#18A154]">
        <TrendingUp className="size-3" aria-hidden="true" />
        {stat.trend} today
      </span>
    </div>
  </article>
);

export default JobStatCard;
