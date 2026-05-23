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
      "bg-[#25C269] hover:bg-green-600 border-[#25C269] text-[#FBFFF8] font-bold",
    secondary:
      "bg-[#FBFFF8] hover:bg-green-100 text-[#25C269] font-semibold border-[#25C269]",
    default: "bg-[#FBFFF8] border-[#D9D9D9] hover:bg-gray-100 font-semibold",
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
