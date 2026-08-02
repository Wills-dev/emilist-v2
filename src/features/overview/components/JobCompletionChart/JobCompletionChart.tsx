"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { JobCompletionData } from "../../types";

export const JOB_COMPLETION_SEGMENTS: Array<{
  key: keyof JobCompletionData;
  color: string;
  label: string;
}> = [
  { key: "completed", color: "#18A154", label: "Completed jobs" },
  { key: "pending", color: "#FF9933", label: "Pending jobs" },
  { key: "overdue", color: "#FF5D7A", label: "Overdue jobs" },
];

const polarPoint = (angle: number, radius: number) => {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: 160 + radius * Math.cos(radians),
    y: 150 + radius * Math.sin(radians),
  };
};

const getDonutSegmentPath = (startAngle: number, endAngle: number) => {
  const outerStart = polarPoint(endAngle, 92);
  const outerEnd = polarPoint(startAngle, 92);
  const innerStart = polarPoint(startAngle, 47);
  const innerEnd = polarPoint(endAngle, 47);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A 92 92 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A 47 47 0 ${largeArc} 1 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
};

const PercentageCallout = ({
  value,
  angle,
  color,
}: {
  value: number;
  angle: number;
  color: string;
}) => {
  const point = polarPoint(angle, 120);
  const width = 48;
  const height = 30;
  const x = point.x - width / 2;
  const y = point.y - height / 2;
  const isAboveChart = point.y < 150;
  const tailX = point.x < 160 ? x + width - 9 : x + 9;
  const tailPath = isAboveChart
    ? `M ${tailX - 6} ${y + height} L ${tailX} ${y + height + 9} L ${tailX + 6} ${y + height}`
    : `M ${tailX - 6} ${y} L ${tailX} ${y - 9} L ${tailX + 6} ${y}`;

  return (
    <g>
      <path
        d={tailPath}
        fill="white"
        stroke={color}
        strokeOpacity="0.2"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="5"
        fill="white"
        stroke={color}
        strokeOpacity="0.2"
        strokeWidth="2.5"
      />
      <text
        x={point.x}
        y={point.y + 5}
        textAnchor="middle"
        fill="#474C48"
        fontSize="14"
      >
        {value}%
      </text>
    </g>
  );
};

const JobCompletionChart = ({ data }: { data: JobCompletionData }) => {
  const reduceMotion = useReducedMotion();
  const chartKey = `${data.completed}-${data.pending}-${data.overdue}`;
  const chartSegments = JOB_COMPLETION_SEGMENTS.map((segment, index) => {
    const startAngle = JOB_COMPLETION_SEGMENTS.slice(0, index).reduce(
      (total, previousSegment) =>
        total + data[previousSegment.key] * 3.6,
      0,
    );
    const endAngle = startAngle + data[segment.key] * 3.6;

    return {
      ...segment,
      startAngle,
      endAngle,
      middleAngle: startAngle + (endAngle - startAngle) / 2,
    };
  });

  return (
    <svg
      viewBox="0 0 320 300"
      role="img"
      aria-label={`Job completion: ${data.completed}% completed, ${data.pending}% pending, and ${data.overdue}% overdue`}
      className="mx-auto w-full max-w-80"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.g
          key={chartKey}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03, rotate: 3 }}
          transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {chartSegments.map((segment) => (
            <g key={segment.key}>
              <path
                d={getDonutSegmentPath(segment.startAngle, segment.endAngle)}
                fill={segment.color}
              />
              <PercentageCallout
                value={data[segment.key]}
                angle={segment.middleAngle}
                color={segment.color}
              />
            </g>
          ))}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
};

export default JobCompletionChart;
