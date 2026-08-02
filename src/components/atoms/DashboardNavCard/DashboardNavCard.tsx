"use client";

import clsx from "clsx";
import Link from "next/link";

import { useActivePath } from "@/lib/hooks/useActivePath";

const DashboardNavCard = ({
  href,
  activePath,
  icon,
  label,
  aRef = false,
  variant = "default",
  onClick,
  className = "",
}: {
  href?: string;
  activePath?: string;
  label: string;
  icon: React.ReactElement;
  aRef?: boolean;
  className?: string;
  variant?: "default" | "sidebar" | "header";
  onClick?: () => void;
}) => {
  const isActive = useActivePath(activePath || href || "");

  const variants = {
    default: {
      base: "sm:gap-3 gap-2 flex items-center transition-all duration-300 whitespace-nowrap sm:px-3 px-2 py-2 max-sm:text-sm rounded-[6px] font-medium",
      active: "text-[#18A154] bg-[#F0FDF5]",
      inactive: "bg-[#F9F9F9] hover:bg-gray-100 hover:text-gray-800",
    },
    sidebar: {
      base: "sm:gap-3 gap-2 flex items-center transition-all duration-300 whitespace-nowrap sm:px-3 px-2 py-2 max-sm:text-sm rounded-[6px] font-medium cursor-pointer",
      active: "",
      inactive: "bg-[#F9F9F9] hover:bg-gray-100 text-[#FF5D7A]",
    },
    header: {
      base: "font-exo gap-2 flex items-center transition-all duration-300 px-2.5 py-1.5 rounded-[24px] whitespace-nowrap",
      active: "text-green-800 bg-[#9EF76929]",
      inactive: "hover:bg-gray-100 hover:text-gray-800",
    },
  };

  const styles = variants[variant];

  const buttonElement = (
    <button
      type="button"
      onClick={onClick}
      className={clsx(styles.base, styles?.inactive, className)}
    >
      <span className="sm:text-xl"> {icon && icon}</span>
      <span className="block">{label}</span>
    </button>
  );

  const aElement = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(styles.base, styles?.inactive, className)}
    >
      <span className="sm:text-xl"> {icon && icon}</span>
      <span className="block">{label}</span>
    </a>
  );

  return (
    <>
      {href ? (
        <>
          {aRef ? (
            aElement
          ) : (
            <Link
              href={href}
              onClick={onClick}
              className={clsx(
                styles.base,
                isActive ? styles.active : styles?.inactive,
                className,
              )}
            >
              <span className="sm:text-xl"> {icon && icon}</span>
              <span className="block">{label}</span>
            </Link>
          )}
        </>
      ) : (
        buttonElement
      )}
    </>
  );
};

export default DashboardNavCard;
