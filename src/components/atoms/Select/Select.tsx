import { selectOption } from "@/lib/types";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: selectOption[] | string[];
  placeholder?: string;
}

const Select = ({
  options,
  placeholder,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className="relative flex items-center backdrop-blur-2xl bg-[#ECECEC] text-[#737774] rounded-[10px] focus-within:border transition-all focus-within:border-[#25C269]  duration-300 h-11 p-1">
      <select
        style={{ fontSize: "16px" }}
        className={`w-full bg-inherit h-full placeholder-gray-300 outline-none ${className}`}
        {...props}
      >
        <option value="" disabled className="text-gray-300">
          {placeholder || "Select an option"}
        </option>
        {options.map((option) => {
          const item =
            typeof option === "string"
              ? { label: option, value: option }
              : option;

          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
