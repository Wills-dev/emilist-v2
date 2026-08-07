import { ReportLegendItem } from "../../types";

const ReportLegendGrid = ({ items }: { items: ReportLegendItem[] }) => (
  <div className="grid min-w-40 grid-cols-2 gap-x-5 gap-y-4">
    {items.map((item) => (
      <div key={item.label} className="flex min-w-0 gap-2">
        <span
          className="mt-0.5 h-8 w-1 shrink-0 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="min-w-0">
          <span className="block truncate text-[10px] text-[#737774]">
            {item.label}
          </span>
          <strong className="block font-exo text-sm font-medium text-[#101828]">
            {item.value}
          </strong>
        </span>
      </div>
    ))}
  </div>
);

export default ReportLegendGrid;
