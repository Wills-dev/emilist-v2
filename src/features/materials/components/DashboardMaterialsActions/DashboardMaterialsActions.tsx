import { motion } from "framer-motion";
import { X } from "lucide-react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import FilterIcon from "@/components/atoms/icons/FilterIcon";
import MarketplaceActionTitle from "@/components/atoms/MarketplaceActionTitle/MarketplaceActionTitle";
import Select from "@/components/atoms/Select/Select";
import { sortOptions } from "@/lib/constants/filter";

const DashboardMaterialsActions = ({
  hasFilters,
  onCloseFilter,
  onOpenFilter,
  onResetFilters,
  tab,
}: {
  hasFilters: boolean;
  onCloseFilter: () => void;
  onOpenFilter: () => void;
  onResetFilters: () => void;
  tab: string;
}) => {
  const isFilterOpen = tab === "filter";

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        {isFilterOpen ? (
          <BackButton onClose={onCloseFilter} />
        ) : (
          <Select options={sortOptions} variant="secondary" fontSize="14px" />
        )}
        <button
          type="button"
          onClick={onOpenFilter}
          className="flex items-center cursor-pointer gap-2 bg-[#F9F9F9] hover:shadow transition-all duration-300 sm:h-8.5 h-7.5 px-3 rounded-[24px] text-[#5D6771] text-sm xl:hidden"
        >
          <FilterIcon />
        </button>
        {isFilterOpen && hasFilters && (
          <motion.button
            type="button"
            onClick={onResetFilters}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-3 h-7 flex items-center cursor-pointer gap-1 bg-[#FFF1F2] text-[#FF5D7A] text-sm rounded-[24px] xl:hidden"
          >
            <X className="w-[1em] h-[1em]" />
            <span>Reset filters</span>
          </motion.button>
        )}
      </div>
      <div className="flex items-center gap-5">
        <MarketplaceActionTitle title="Manage orders" link="" />
        <MarketplaceActionTitle title="Manage listed items" link="" />
        <MarketplaceActionTitle title="Post material" link="" />
      </div>
    </div>
  );
};

export default DashboardMaterialsActions;
