export interface OptionToggleItem<T extends string> {
  value: T;
  label: string;
}

const OptionToggle = <T extends string>({
  options,
  value,
  onChange,
  name,
  ariaLabel,
  disabled = false,
  className = "text-[#303632]",
}: {
  options: OptionToggleItem<T>[];
  value: T;
  onChange: (value: T) => void;
  name: string;
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
}) => (
  <div
    role="radiogroup"
    aria-label={ariaLabel}
    aria-disabled={disabled}
    className={`flex flex-wrap gap-6 ${disabled ? "opacity-50" : ""}`}
  >
    {options.map((option) => (
      <label
        key={option.value}
        className={`flex items-center gap-2 text-sm ${className} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          disabled={disabled}
          className="peer sr-only"
        />
        <span
          className={`flex size-5 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[#25C269] peer-focus-visible:ring-offset-2 ${
            value === option.value ? "border-[#25C269]" : "border-[#8A8D8B]"
          }`}
        >
          <span
            className={`size-3.5 rounded-full ${
              value === option.value ? "bg-[#25C269]" : "bg-transparent"
            }`}
          />
        </span>
        {option.label}
      </label>
    ))}
  </div>
);

export default OptionToggle;
