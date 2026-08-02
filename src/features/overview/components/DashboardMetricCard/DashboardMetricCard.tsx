import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

import { DashboardMetric } from "../../types";

const DashboardMetricCard = ({ metric }: { metric: DashboardMetric }) => (
  <article className="flex min-h-40 flex-col justify-between bg-white p-4">
    <p className="w-fit rounded-full bg-[#F8F8F8] px-2 py-1 text-xs text-[#667085] before:mr-2 before:inline-block before:size-1.5 before:rounded-full before:bg-[#25C269]">
      {metric.title}
    </p>
    <div className="flex items-end gap-2">
      <strong className="font-exo text-2xl">{metric.value || "…"}</strong>
      {metric.suffix && <span className="text-sm">{metric.suffix}</span>}
      {metric.change && (
        <span
          className={`ml-auto flex items-center text-xs ${
            metric.changeDirection === "down"
              ? "text-[#FF5D7A]"
              : "text-[#18A154]"
          }`}
        >
          {metric.changeDirection === "down" ? (
            <ArrowDown className="size-3" />
          ) : (
            <ArrowUp className="size-3" />
          )}
          {metric.change}
        </span>
      )}
      <span className="text-xs text-[#667085]">{metric.context}</span>
    </div>
    <Link
      href={metric.href}
      className={`flex items-center gap-1 text-sm ${
        metric.value ? "text-[#18A154]" : "pointer-events-none text-[#A8DFBF]"
      }`}
    >
      {metric.linkLabel} <ArrowRight className="size-4" />
    </Link>
  </article>
);

export default DashboardMetricCard;
