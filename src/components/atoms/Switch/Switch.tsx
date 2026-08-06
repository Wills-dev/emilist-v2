import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label": string;
}

const Switch = ({
  checked,
  onCheckedChange,
  disabled = false,
  className,
  "aria-label": ariaLabel,
}: SwitchProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={() => onCheckedChange(!checked)}
    className={clsx(
      "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25C269] disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-[#12B981]" : "bg-[#D9D9D9]",
      className,
    )}
  >
    <span
      aria-hidden="true"
      className={clsx(
        "absolute left-1 top-1 size-4 rounded-full bg-white shadow-sm transition-transform duration-200",
        checked ? "translate-x-5" : "translate-x-0",
      )}
    />
  </button>
);

export default Switch;
