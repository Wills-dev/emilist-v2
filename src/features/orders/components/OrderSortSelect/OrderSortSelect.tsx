import { ChevronDown } from "lucide-react";
import type { OrderSort } from "../../types/order";

const options: { label: string; value: OrderSort }[] = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: high to low", value: "total_high_low" },
  { label: "Price: low to high", value: "total_low_high" },
];

export default function OrderSortSelect({ value, onChange, label }: {
  value: OrderSort; onChange: (sort: OrderSort) => void; label: string;
}) {
  return (
    <div className="relative w-44 max-w-full shrink-0">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => {
          const selected = options.find((option) => option.value === event.target.value);
          if (selected) onChange(selected.value);
        }}
        className="h-10 w-full appearance-none truncate rounded-lg border-0 bg-[#F6F7F9] pl-3 pr-9 text-sm text-[#737774] outline-none focus-visible:ring-2 focus-visible:ring-[#25C269]"
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#474C48]" />
    </div>
  );
}
