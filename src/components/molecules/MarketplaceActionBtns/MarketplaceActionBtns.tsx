"use client";

import Link from "next/link";

import FilterIcon from "@/components/atoms/icons/FilterIcon";
import Select from "@/components/atoms/Select/Select";
import PlusIcon from "@/components/atoms/icons/PlusIcon";
import BackButton from "@/components/atoms/BackButton/BackButton";

import { sortOptions } from "@/lib/constants/filter";

const MarketplaceActionBtns = ({
  onClose,
  onOpen,
  tab,
  actionTitle,
  actionLink,
  sortBy,
  onSortChange,
}: {
  onOpen: () => void;
  onClose: () => void;
  onReset?: () => void;
  hasFilter?: boolean;
  tab: string;
  actionTitle: string;
  actionLink: string;
  sortBy?: string | null;
  onSortChange?: (value: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        {tab === "" && onSortChange ? (
          <Select
            options={sortOptions}
            variant="secondary"
            fontSize="14px"
            value={sortBy ?? ""}
            onChange={(event) => onSortChange?.(event.target.value)}
            placeholder="Sort by"
          />
        ) : tab !== "" ? (
          <BackButton onClose={onClose} />
        ) : null}
        <button
          type="button"
          onClick={onOpen}
          className="flex items-center cursor-pointer gap-2 bg-[#F6F7F9] hover:shadow transition-all duration-300 sm:h-8.5 h-7.5 px-3 rounded-[24px] text-[#5D6771] text-sm  xl:hidden"
        >
          <FilterIcon />
        </button>
      </div>
      <Link
        href={actionLink}
        className="flex items-center font-exo font-semibold text-[#6667FF] max-sm:text-sm gap-2 max-xl:hidden"
      >
        <PlusIcon />
        <span>{actionTitle}</span>
      </Link>
      <Link
        href={actionLink}
        className="flex items-center font-exo font-semibold text-[#6667FF] max-sm:text-sm gap-2 xl:hidden"
      >
        <PlusIcon />
        <span>{actionTitle}</span>
      </Link>
    </div>
  );
};

export default MarketplaceActionBtns;
