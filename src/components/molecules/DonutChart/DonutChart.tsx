"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
  displayValue?: string;
}

const DonutChart = ({
  segments,
  centerValue,
  centerLabel,
  ariaLabel,
}: {
  segments: DonutSegment[];
  centerValue: string;
  centerLabel?: string;
  ariaLabel: string;
}) => {
  const reduceMotion = useReducedMotion();
  const [activeSegment, setActiveSegment] = useState<DonutSegment | null>(null);
  const total = Math.max(
    segments.reduce((sum, segment) => sum + segment.value, 0),
    1,
  );
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  let accumulatedValue = 0;

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-52"
      onMouseLeave={() => setActiveSegment(null)}
    >
      <svg
        viewBox="0 0 180 180"
        role="img"
        aria-label={ariaLabel}
        className="size-full -rotate-90"
      >
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#F0F1F1"
          strokeWidth="24"
        />
        {segments.map((segment, index) => {
          const length = (segment.value / total) * circumference;
          const offset = (accumulatedValue / total) * circumference;
          accumulatedValue += segment.value;

          return (
            <motion.circle
              key={`${segment.label}-${segment.value}`}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="24"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              tabIndex={0}
              role="button"
              aria-label={`${segment.label}: ${segment.displayValue ?? segment.value}`}
              onMouseEnter={() => setActiveSegment(segment)}
              onFocus={() => setActiveSegment(segment)}
              onBlur={() => setActiveSegment(null)}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: "easeOut",
              }}
              style={{
                cursor: "pointer",
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            />
          );
        })}
      </svg>

      {activeSegment && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute left-1/2 top-1 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#101828] px-3 py-1.5 text-center text-[10px] text-white shadow-lg"
        >
          <span className="block text-white/70">{activeSegment.label}</span>
          <strong className="font-exo text-xs">
            {activeSegment.displayValue ?? activeSegment.value}
          </strong>
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <strong className="font-exo text-lg font-semibold text-[#101828]">
          {centerValue}
        </strong>
        {centerLabel && (
          <span className="text-[10px] text-[#737774]">{centerLabel}</span>
        )}
      </div>
    </div>
  );
};

export default DonutChart;
