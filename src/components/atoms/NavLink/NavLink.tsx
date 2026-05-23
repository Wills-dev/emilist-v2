"use client";

import Link from "next/link";

import clsx from "clsx";

import { NavLinkProps } from "@/lib/types";
import { useActivePath } from "@/lib/hooks/useActivePath";

const NavLink = ({
  href,
  title,
  icon,
  className,
  onClick,
  variant = "default",
  activeTab = false,
}: NavLinkProps) => {
  const isActive = useActivePath(href || "");

  const variants = {
    default: {
      base: "font-exo gap-2 flex items-center transition-all duration-300 whitespace-nowrap  sm:px-4 px-2 sm:text-sm text-xs rounded-[24px] sm:h-9 h-7 font-medium",
      active: "text-green-800 bg-[#9EF76929]",
      inactive: "bg-[#F9F9F9] hover:bg-gray-100 hover:text-gray-800",
    },
    sidebar: {
      base: "flex items-center gap-3 px-3 py-2 rounded-md whitespace-nowrap",
      active: "bg-black text-white",
      inactive: "hover:bg-gray-100 hover:text-black",
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
      className={clsx(
        styles.base,
        activeTab ? styles.active : styles?.inactive,
        className,
      )}
    >
      {icon && icon}
      <span className="block">{title}</span>
    </button>
  );

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={clsx(
            styles.base,
            isActive ? styles.active : styles?.inactive,
            className,
          )}
        >
          {icon && icon}
          <span className="block">{title}</span>
        </Link>
      ) : (
        buttonElement
      )}
    </>
  );
};

export default NavLink;
