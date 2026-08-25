import clsx from "clsx";

export type StatusBadgeTone = "success" | "warning" | "danger" | "neutral";

const toneStyles: Record<StatusBadgeTone, string> = {
  success: "bg-[#EAFBF1] text-[#07883E]",
  warning: "bg-[#FFF6E8] text-[#FF8A00]",
  danger: "bg-[#FFF0F3] text-[#FF5D7A]",
  neutral: "bg-[#F8F8F8] text-[#667085]",
};

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
      toneStyles[tone],
      className,
    )}
  >
    {label}
  </span>
);

export default StatusBadge;
