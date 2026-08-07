import Select from "@/components/atoms/Select/Select";

export interface SegmentedTabOption<T extends string> {
  value: T;
  label: string;
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
      className={`no-scrollbar max-w-full items-center overflow-x-auto rounded-full bg-[#F7F7F7] p-1 ${
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
          className={`shrink-0 rounded-full transition-colors ${
            size === "compact"
              ? "flex-1 px-2 py-2 text-xs"
              : "px-5 py-2 text-sm"
          } ${
            value === option.value
              ? "bg-white font-medium text-[#303632] shadow-sm"
              : "text-[#737774] hover:text-[#303632]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>

    {responsive && (
      <div className="max-w-46 min-w-0 flex-1 sm:hidden">
        <Select
          aria-label={ariaLabel}
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          options={options}
          variant="tertiary"
          className="cursor-pointer px-2 font-exo font-medium text-[#303632]"
        />
      </div>
    )}
  </>
);

export default SegmentedTabs;
