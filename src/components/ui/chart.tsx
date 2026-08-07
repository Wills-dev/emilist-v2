"use client";

import * as React from "react";
import { ResponsiveContainer, Tooltip } from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  { label?: React.ReactNode; color?: string }
>;

const ChartContainer = ({
  children,
  className,
  config,
}: {
  children: React.ReactElement;
  className?: string;
  config: ChartConfig;
}) => (
  <div
    data-chart-items={Object.keys(config).join(" ")}
    className={cn(
      "flex min-h-0 min-w-0 aspect-video justify-center text-xs",
      className,
    )}
  >
    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
      {children}
    </ResponsiveContainer>
  </div>
);

const ChartTooltip = Tooltip;

interface ChartTooltipPayloadItem {
  dataKey?: string | number;
  color?: string;
  name?: React.ReactNode;
  value?: string | number;
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: readonly ChartTooltipPayloadItem[];
  label?: React.ReactNode;
}

const ChartTooltipContent = ({
  active,
  payload,
  label,
}: ChartTooltipContentProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-32 rounded-lg border border-[#E5E7E6] bg-white p-2 text-xs shadow-xl">
      <p className="mb-1 font-medium text-[#303632]">{label}</p>
      {payload.map((item) => (
        <p
          key={String(item.dataKey)}
          className="flex items-center justify-between gap-4"
        >
          <span className="flex items-center gap-1 text-[#737774]">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </span>
          <strong>₦ {Number(item.value).toLocaleString()}</strong>
        </p>
      ))}
    </div>
  );
};

export { ChartContainer, ChartTooltip, ChartTooltipContent };
