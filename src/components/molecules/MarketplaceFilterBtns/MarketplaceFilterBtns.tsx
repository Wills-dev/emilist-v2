"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import FilterIcon from "@/components/atoms/icons/FilterIcon";

const MarketplaceFilterBtns = ({
  onReset,
  hasFilter,
}: {
  onReset: () => void;
  hasFilter: boolean;
}) => {
  return (
    <div className="flex justify-between items-center gap-10 max-xl:hidden">
      <div className="flex items-center gap-4">
        <button
          type="button"
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
            animate={{ opacity: 1 }}
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
