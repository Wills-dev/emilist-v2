"use client";

import Link from "next/link";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import FilterIcon from "@/components/atoms/icons/FilterIcon";
import Select from "@/components/atoms/Select/Select";
import PlusIcon from "@/components/atoms/icons/PlusIcon";

import { routes } from "@/lib/helpers/routes";
import { sortOptions } from "@/lib/constants/filter";
import BackButton from "@/components/atoms/BackButton/BackButton";

const MarketplaceJobActionBtns = ({
  onClose,
  onOpen,
  onReset,
  hasFilter,
  tab,
}: {
  onOpen: () => void;
  onClose: () => void;
  onReset: () => void;
  hasFilter: boolean;
  tab: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {tab === "" ? (
          <Select options={sortOptions} variant="secondary" fontSize="14px" />
        ) : (
          <BackButton onClose={onClose} />
        )}
        <button
          type="button"
          onClick={onOpen}
          className="flex items-center cursor-pointer gap-2 bg-[#F6F7F9] hover:shadow transition-all duration-300 sm:h-8.5 h-7.5 px-3 rounded-[24px] text-[#5D6771] text-sm  xl:hidden"
        >
          <FilterIcon />
        </button>
      </div>
      <Link
        href={routes?.joinExpert}
        className="flex items-center font-exo font-semibold text-[#6667FF] max-sm:text-sm gap-2 max-xl:hidden"
      >
        <PlusIcon />
        <span>Offer a service</span>
      </Link>
      <AnimatePresence mode="wait">
        {hasFilter ? (
          <motion.button
            type="button"
            onClick={onReset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-3 h-7 flex items-center cursor-pointer gap-1 bg-[#FFF1F2] text-[#FF5D7A] text-sm rounded-[24px] xl:hidden"
          >
            <X className="w-[1em] h-[1em]" />
            <span>Reset filters</span>
          </motion.button>
        ) : (
          <Link
            href={routes?.joinExpert}
            className="flex items-center font-exo font-semibold text-[#6667FF] max-sm:text-sm gap-2 xl:hidden"
          >
            <PlusIcon />
            <span>Offer a service</span>
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplaceJobActionBtns;
