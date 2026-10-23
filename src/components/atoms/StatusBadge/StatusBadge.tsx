import clsx from "clsx";

export type StatusBadgeTone = "success" | "warning" | "danger" | "neutral";

const toneStyles: Record<StatusBadgeTone, string> = {
  success: "bg-[#EAFBF1] text-[#07883E]",
  warning: "bg-[#FFF6E8] text-[#FF8A00]",
  danger: "bg-[#FFF0F3] text-[#FF5D7A]",
  neutral: "bg-[#F8F8F8] text-[#667085]",
};

const STATUS_TONES: Record<string, StatusBadgeTone> = {
  countered: "warning",
  draft: "neutral", pending: "warning", listed: "success", applied: "success",
  "in-review": "warning", accepted: "success", rejected: "danger",
  cancelled: "danger", canceled: "danger", overdue: "danger", paused: "warning",
  active: "success", "in-progress": "success", completed: "neutral",
  paid: "success", unpaid: "warning", upcoming: "neutral", inactive: "neutral",
};

export const getStatusBadgeTone = (label: string, fallback: StatusBadgeTone = "neutral") =>
  STATUS_TONES[label.trim().toLowerCase().replace(/[ _]+/g, "-")] ?? fallback;

const StatusBadge = ({
  label,
  tone = "neutral",
  className,
}: {
  label: string;
  tone?: StatusBadgeTone;
  className?: string;
}) => (
  <span
    className={clsx(
      "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize",
      toneStyles[getStatusBadgeTone(label, tone)],
      className,
    )}
  >
    {label}
  </span>
);

export default StatusBadge;
