import { Star } from "lucide-react";
import type { MouseEventHandler } from "react";

export default function ContractRating({ label, name, value, onChange }: {
  label: string;
  name: string;
  value: number;
  onChange: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-[#303632]">{label}</legend>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" name={name} value={star} onClick={onChange} aria-label={`${label}: ${star} out of 5`} aria-pressed={star === value} className={`rounded p-1 transition-colors focus-visible:outline-2 focus-visible:outline-[#25C269] ${star <= value ? "text-[#FF9933]" : "text-[#B8B9B8]"}`}>
            <Star className="size-7" fill={star <= value ? "currentColor" : "none"} />
          </button>
        ))}
      </div>
    </fieldset>
  );
}
