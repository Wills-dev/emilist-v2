"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import FilterIcon from "@/components/atoms/icons/FilterIcon";

const MarketplaceFilterBtns = ({
  onClose,
  onOpen,
  onReset,
  hasFilter,
}: {
  onClose: () => void;
  onOpen: () => void;
  onReset: () => void;
  hasFilter: boolean;
}) => {
  return (
    <div className="flex justify-between items-center gap-10">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onClose}
          className="sm:hidden cursor-pointer flex items-center gap-2 bg-[#F6F7F9] hover:shadow transition-all duration-300 h-8.5 px-2 rounded-[10px] text-[#737774] text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[1em] h-[1em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>

          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={onOpen}
          className="flex items-center cursor-pointer gap-2 bg-[#F6F7F9] hover:shadow transition-all duration-300 sm:h-8.5 h-7.5 px-3 rounded-[24px] text-[#5D6771] text-sm"
        >
          <FilterIcon />
          <span className={` ${hasFilter ? "" : "sm:block hidden"}`}>
            Filters
          </span>
        </button>
      </div>
      <AnimatePresence mode="wait">
        {hasFilter && (
          <motion.button
            type="button"
            onClick={onReset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-3 h-7 flex items-center cursor-pointer gap-1 bg-[#FFF1F2] text-[#FF5D7A] text-sm rounded-[24px]"
          >
            <X className="w-[1em] h-[1em]" />
            <span>Reset filters</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplaceFilterBtns;
