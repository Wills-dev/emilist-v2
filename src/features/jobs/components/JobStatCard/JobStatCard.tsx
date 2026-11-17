import type { LucideIcon } from "lucide-react";
import clsx from "clsx";
import type { BadgeTone, JobStat } from "../../types/manageJobs";

const toneStyles: Record<BadgeTone, string> = {
  success: "bg-[#EAFBF1] text-[#07883E]",
  warning: "bg-[#FFF6E8] text-[#FF8A00]",
  danger: "bg-[#FFF0F3] text-[#FF5D7A]",
  neutral: "bg-[#F8F8F8] text-[#667085]",
};

const JobStatCard = ({ stat, icon: Icon }: { stat: JobStat; icon: LucideIcon }) => (
  <article className="flex min-h-40 flex-col justify-between border border-[#F1F2F9] bg-white p-4">
    <span className={clsx("flex size-8 items-center justify-center rounded-full", toneStyles[stat.tone])}>
      <Icon className="size-4" aria-hidden="true" />
    </span>
    <p className="text-sm font-medium text-[#303632]">{stat.label}</p>
    <strong className="font-exo text-2xl text-[#101828]">{stat.value.toLocaleString("en-US")}</strong>
  </article>
);

export default JobStatCard;
