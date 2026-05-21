import Link from "next/link";

import clsx from "clsx";

import { ButtonProps } from "@/lib/types";
import { Loader } from "lucide-react";

const Button = ({
  className = "w-fit",
  variant = "default",
  disabled = false,
  loading = false,
  children,
  onClick,
  href,
  type = "button",
}: ButtonProps) => {
  const baseStyle =
    "rounded-[10px] px-5 py-3 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap font-exo transition-all duration-300 border";
  const variants = {
    primary:
      "bg-green-500 hover:bg-green-600 border-green-500 text-[#FBFFF8] font-bold",
    secondary:
      "bg-green-50 hover:bg-green-100 text-green-500 font-semibold border-green-500",
    default: "bg-gray-50 hover:bg-gray-100 font-semibold border-gray-100",
  };

  const styles = variants[variant];

  const buttonElement = (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyle, styles, className)}
      disabled={disabled || loading}
    >
      {loading ? <Loader className="animate-spin w-8 h-8" /> : children}
    </button>
  );

  return href ? (
    <Link href={href} className={`${className}`}>
      {buttonElement}
    </Link>
  ) : (
    buttonElement
  );
};

export default Button;
