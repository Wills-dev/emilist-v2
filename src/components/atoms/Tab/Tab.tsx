"use client";

import Link from "next/link";

import { useActivePath } from "@/lib/hooks/useActivePath";

const Tab = ({ label, link }: { label: string; link: string }) => {
  const isActive = useActivePath(link || "");

  return (
    <Link
      href={link}
      className={`rounded-[14px] px-3 h-9 flex items-center sm:text-xs text-[10px] font-medium ${isActive ? "text-[#303632] bg-white" : "text-[#737774]"}`}
    >
      {label}
    </Link>
  );
};

export default Tab;
