"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { MonthlyTransaction } from "../../types";

const chartConfig = {
  inflow: { label: "Inflow", color: "#18A154" },
  outflow: { label: "Outflow", color: "#FF5D7A" },
} satisfies ChartConfig;

const rangeMonths = { "1M": 1, "3M": 3, "6M": 6, "1Y": 12 } as const;

const TransactionChart = ({ data }: { data: MonthlyTransaction[] }) => {
  const [range, setRange] = useState<keyof typeof rangeMonths>("1Y");
  const visibleData = data.slice(-rangeMonths[range]);

  return (
    <section className="bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#667085]">Transactions</p>
          <div className="mt-2 flex items-center gap-2">
            <strong className="font-exo text-2xl text-[#101828]">32</strong>
            <span className="text-xs text-[#18A154]">↑ 73%</span>
            <span className="text-[10px] text-[#737774]">since last month</span>
          </div>
        </div>
        <div className="flex gap-1">
          {Object.keys(rangeMonths).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRange(option as keyof typeof rangeMonths)}
              className={`rounded-lg px-3 py-2 text-xs ${range === option ? "bg-[#F6F7F9] text-[#101828]" : "text-[#737774]"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-end gap-4 text-xs text-[#667085]">
        <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[#18A154]" />Inflow</span>
        <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[#FF5D7A]" />Outflow</span>
      </div>

      <ChartContainer config={chartConfig} className="mt-1 h-44 w-full">
        <BarChart data={visibleData} barGap={4}>
          <CartesianGrid vertical={false} stroke="#EEF1EF" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={10} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tickFormatter={(value) => `${value / 1000000}M`} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="outflow" name="Outflow" fill="#FF5D7A" radius={[2, 2, 0, 0]} />
          <Bar dataKey="inflow" name="Inflow" fill="#18A154" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </section>
  );
};

export default TransactionChart;
