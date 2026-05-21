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
  variant = "default",
}: NavLinkProps) => {
  const isActive = useActivePath(href);
  const variants = {
    default: {
      base: "font-exo gap-2 flex items-center transition-all duration-300 whitespace-nowrap",
      hover: "hover:bg-gray-100 hover:text-gray-800",
      active: "text-green-800 bg-[#9EF76929]",
    },
    sidebar: {
      base: "flex items-center gap-3 px-3 py-2 rounded-md whitespace-nowrap",
      hover: "hover:bg-gray-100 hover:text-black",
      active: "bg-black text-white",
    },
    header: {
      base: "font-exo gap-2 flex items-center transition-all duration-300 px-2.5 py-1.5 rounded-[24px] whitespace-nowrap",
      hover: "hover:bg-gray-100 hover:text-gray-800",
      active: "text-green-800 bg-[#9EF76929]",
    },
  };

  const styles = variants[variant];

  return (
    <Link
      href={href}
      className={clsx(
        styles.base,
        styles.hover,
        isActive && styles.active,
        className,
      )}
    >
      {icon && icon}
      <span className="block">{title}</span>
    </Link>
  );
};

export default NavLink;
