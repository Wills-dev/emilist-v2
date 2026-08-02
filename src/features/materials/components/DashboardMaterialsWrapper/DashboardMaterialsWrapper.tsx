"use client";

import { motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import MarketplaceMaterialCardWrap from "../MarketplaceMaterialCardWrap/MarketplaceMaterialCardWrap";
import MarketplaceFilterBtns from "@/components/molecules/MarketplaceFilterBtns/MarketplaceFilterBtns";
import DashboardMaterialsActions from "../DashboardMaterialsActions/DashboardMaterialsActions";
import DashboardMaterialsFilter from "../DashboardMaterialsFilter/DashboardMaterialsFilter";
import DashboardMaterialsHeader from "../DashboardMaterialsHeader/DashboardMaterialsHeader";
import MobileFilterModal from "@/components/molecules/MobileFilterModal/MobileFilterModal";

import { useGetAllMaterials } from "../../hooks/useGetAllMaterials";
import { routes } from "@/lib/helpers/routes";

const DashboardMaterialsWrapper = () => {
  const {
    materials,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
    handleSearch,
    handleSearchChange,
  } = useGetAllMaterials({ limit: 10 });

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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex flex-wrap justify-between gap-2 pb-20 pt-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
          className="h-fit w-full max-w-202 bg-white p-4 max-sm:px-2"
        >
          <div className="space-y-8">
            <DashboardMaterialsHeader
              onSearchSubmit={handleSearch}
              setSearch={handleSearchChange}
            />
            <div className="space-y-4">
              <DashboardMaterialsActions
                onCloseFilter={() => setTab("")}
                onOpenFilter={() => setTab("filter")}
                tab={tab}
                sortBy={filters.sortBy}
                onSortChange={(value) => setFilter("sortBy", value)}
              />
              <MarketplaceMaterialCardWrap
                materials={materials}
                isLoading={isLoading}
                isError={isError}
                fetchNextPage={fetchNextPage}
                hasNextPage={Boolean(hasNextPage)}
                isFetchingNextPage={isFetchingNextPage}
                getReviewsHref={routes.dashboardLinks.materialInfoReviews}
              />
            </div>
          </div>
        </motion.div>
        <motion.aside
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
          className="w-full max-w-68 space-y-6 max-xl:hidden"
        >
          <MarketplaceFilterBtns
            onReset={resetFilters}
            hasFilter={hasFilters}
            variant="tertiary"
          />
          <DashboardMaterialsFilter {...filterProps} />
        </motion.aside>
      </motion.div>
      <MobileFilterModal
        open={tab === "filter"}
        onClose={(open) => !open && setTab("")}
        onReset={resetFilters}
        hasFilters={hasFilters}
      >
        <DashboardMaterialsFilter {...filterProps} />
      </MobileFilterModal>
    </Container>
  );
};

export default DashboardMaterialsWrapper;
