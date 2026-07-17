import { selectOption } from "@/lib/types";
import clsx from "clsx";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: selectOption[] | string[];
  placeholder?: string;
  variant?: "primary" | "secondary" | "tertiary";
  fontSize?: string;
}

const Select = ({
  options,
  placeholder,
  className = "",
  variant = "primary",
  fontSize = "16px",
  ...props
}: SelectProps) => {
  const variants = {
    primary: {
      parent: "h-11 bg-[#ECECEC] rounded-[10px] flex items-center w-full",
      child:
        "relative flex items-center backdrop-blur-2xl bg-[#ECECEC] text-[#737774] rounded-[10px] focus-within:border transition-all focus-within:border-[#25C269]  duration-300 h-full p-1 w-full",
    },
    secondary: {
      parent: "bg-[#F6F7F9] h-7.5 rounded-[10px] flex items-center w-full",
      child:
        "relative flex items-center backdrop-blur-2xl bg-[#F6F7F9] text-[#737774] rounded-[10px] focus-within:border transition-all focus-within:border-[#25C269]  duration-300 h-full p-1",
    },
    tertiary: {
      parent:
        "bg-[#ECECEC] flex items-center h-11 rounded-[10px] w-full  p-1 overflow-hidden",
      child:
        "relative flex items-center backdrop-blur-2xl bg-white text-[#737774] rounded-[10px] focus-within:border transition-all focus-within:border-[#25C269]  duration-300 h-full p-1 w-full",
    },
  };

  const styles = variants[variant];

  return (
    <div className={clsx(styles.parent)}>
      <div className={clsx(styles.child)}>
        <select
          style={{ fontSize }}
          className={`w-full bg-inherit h-full placeholder-gray-300 outline-none ${className}`}
          {...props}
        >
          <option value="" disabled className="text-gray-300 ">
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
    </div>
  );
};

export default Select;
