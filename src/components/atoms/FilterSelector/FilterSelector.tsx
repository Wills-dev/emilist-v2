import clsx from "clsx";
import { X } from "lucide-react";
import StarIcon from "../icons/StarIcon";

const FilterSelector = ({
  value,
  onClick,
  variant = "primary",
  showClose,
  showStar,
}: {
  value: number | string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  showClose?: boolean;
  showStar?: boolean;
}) => {
  const variants = {
    primary: "bg-white",
    secondary: "bg-[#F0FDF5] text-[#18A154]",
  };

  const styles = variants[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        styles,
        "px-2 py-1 text-sm rounded-[24px] cursor-pointer flex items-center gap-1",
      )}
    >
      {showStar && (
        <span className="text-[#FF9933]">
          <StarIcon />
        </span>
      )}
      {value}
      {showClose && <X className="w-[1em] h-[1em]" />}
    </button>
  );
};

export default FilterSelector;
