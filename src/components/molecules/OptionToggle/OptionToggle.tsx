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
}: {
  options: OptionToggleItem<T>[];
  value: T;
  onChange: (value: T) => void;
  name: string;
  ariaLabel: string;
}) => (
  <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-6">
    {options.map((option) => (
      <label
        key={option.value}
        className="flex cursor-pointer items-center gap-2 text-sm text-[#303632]"
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          className="peer sr-only"
        />
        <span
          className={`flex size-5 items-center justify-center rounded-full border-2 ${
            value === option.value
              ? "border-[#25C269]"
              : "border-[#8A8D8B]"
          }`}
        >
          <span
            className={`size-3 rounded-full ${
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
