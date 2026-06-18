"use client";

import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  showPassword?: "text" | "password";
  onTogglePassword?: () => void;
}

const Input = ({
  showPassword,
  onTogglePassword,
  icon,
  ...props
}: InputProps) => {
  const paddingX =
    icon !== undefined && showPassword !== undefined
      ? "px-9"
      : icon !== undefined && showPassword === undefined
        ? "pl-9 pr-2"
        : icon === undefined && showPassword !== undefined
          ? "pl-2 pr-9"
          : "px-2";

  return (
    <div className="relative flex items-center backdrop-blur-2xl bg-[#ECECEC] text-[#737774] rounded-[10px] focus-within:border transition-all focus-within:border-[#25C269]  duration-300 h-11 p-1">
      {icon && icon}
      <input
        style={{ fontSize: "16px" }}
        {...props}
        className={`w-full bg-inherit h-full placeholder-gray-400 outline-none ${paddingX}`}
      />
      {showPassword !== undefined && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-2 hover:text-gray-800 transition-colors caret-[#25C269]"
        >
          {showPassword === "text" ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
