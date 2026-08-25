import Select from "@/components/atoms/Select/Select";

export interface SegmentedTabOption<T extends string> {
  value: T;
  label: string;
  badge?: string;
}

const SegmentedTabs = <T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  responsive = true,
  size = "default",
}: {
  options: SegmentedTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  responsive?: boolean;
  size?: "default" | "compact";
}) => (
  <>
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`no-scrollbar max-w-full items-center overflow-x-auto rounded-full bg-[#F7F7F7] p-1 gap-2 ${
        responsive ? "hidden sm:flex" : "flex"
      }`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={`shrink-0 rounded-full transition-colors whitespace-nowrap ${
            size === "compact"
              ? "flex-1 px-2 py-2 text-xs"
              : "px-5 py-2 text-sm"
          } ${
            value === option.value && option.badge
              ? "bg-[#18A154] text-white"
              : value === option.value
                ? "bg-white font-medium text-[#303632] shadow-sm"
                : option.badge
                  ? "bg-[#F0FDF5] text-[#176439]"
                  : "text-[#737774] hover:text-[#303632]"
          }`}
        >
          {option.label}
          {option.badge && (
            <span
              className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-[#215342] text-white`}
            >
              {option.badge}
            </span>
          )}
        </button>
      ))}
    </div>

    {responsive && (
      <div className="max-w-46 min-w-0 flex-1 sm:hidden">
        <Select
          aria-label={ariaLabel}
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          options={options.map((option) => ({
            value: option.value,
            label: option.badge
              ? `${option.label} (${option.badge})`
              : option.label,
          }))}
          variant="tertiary"
          className="cursor-pointer px-2 font-exo font-medium text-[#303632]"
        />
      </div>
    )}
  </>
);

export default SegmentedTabs;
