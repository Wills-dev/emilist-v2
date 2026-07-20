"use client";

import Container from "@/components/atoms/Container/Container";
import { useFilters } from "@/lib/hooks/useFilters";
import { useGeneralSearch } from "@/lib/hooks/useGeneralSearch";
import { AnimatePresence, motion } from "framer-motion";
import MarketplaceMaterialCardWrap from "../MarketplaceMaterialCardWrap/MarketplaceMaterialCardWrap";
import MarketplaceFilterBtns from "@/components/molecules/MarketplaceFilterBtns/MarketplaceFilterBtns";
import DashboardMaterialsActions from "../DashboardMaterialsActions/DashboardMaterialsActions";
import DashboardMaterialsFilter from "../DashboardMaterialsFilter/DashboardMaterialsFilter";
import DashboardMaterialsHeader from "../DashboardMaterialsHeader/DashboardMaterialsHeader";

const DashboardMaterialsWrapper = () => {
  const { handleSubmit, setSearch } = useGeneralSearch();
  const {
    tab,
    setTab,
    filters,
    setFilter,
    clearFilter,
    resetFilters,
    hasFilters,
    setPriceRange,
    toggleCategory,
    isCategorySelected,
  } = useFilters();

  const filterProps = {
    filters,
    setFilter,
    clearFilter,
    setPriceRange,
    toggleCategory,
    isCategorySelected,
  };

  return (
    <Container variant="small">
      <div className="flex justify-between flex-wrap gap-2 pt-4 pb-20">
        <div className="bg-white p-4 max-sm:px-2 w-full max-w-202 h-fit">
          <div className="space-y-8">
            <DashboardMaterialsHeader
              onSearchSubmit={handleSubmit}
              setSearch={setSearch}
            />
            <div className="space-y-4">
              <DashboardMaterialsActions
                hasFilters={hasFilters}
                onCloseFilter={() => setTab("")}
                onOpenFilter={() => setTab("filter")}
                onResetFilters={resetFilters}
                tab={tab}
              />
              <AnimatePresence mode="wait">
                {tab === "" ? (
                  <MarketplaceMaterialCardWrap />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full xl:hidden"
                  >
                    <DashboardMaterialsFilter {...filterProps} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="max-w-68 w-full max-xl:hidden space-y-6">
          <MarketplaceFilterBtns
            onReset={resetFilters}
            hasFilter={hasFilters}
            variant="tertiary"
          />
          <DashboardMaterialsFilter {...filterProps} />
        </div>
      </div>
    </Container>
  );
};

export default DashboardMaterialsWrapper;
