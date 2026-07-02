import clsx from "clsx";
import { X } from "lucide-react";

const FilterSelector = ({
  value,
  onClick,
  variant = "primary",
  showClose,
}: {
  value: number | string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  showClose?: boolean;
}) => {
  const variants = {
    primary: "bg-white",
    secondary: "bg-[#F0FDF5] text-[#18A154] flex items-center gap-1",
  };

  const styles = variants[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        styles,
        "px-3 py-1 text-sm rounded-[24px] cursor-pointer",
      )}
    >
      {value}
      {showClose && <X className="w-[1em] h-[1em]" />}
    </button>
  );
};

export default FilterSelector;
