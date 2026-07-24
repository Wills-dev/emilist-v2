"use client";

import Container from "@/components/atoms/Container/Container";
import MarketplaceMaterialCardWrap from "../MarketplaceMaterialCardWrap/MarketplaceMaterialCardWrap";
import MarketplaceFilterBtns from "@/components/molecules/MarketplaceFilterBtns/MarketplaceFilterBtns";
import DashboardMaterialsActions from "../DashboardMaterialsActions/DashboardMaterialsActions";
import DashboardMaterialsFilter from "../DashboardMaterialsFilter/DashboardMaterialsFilter";
import DashboardMaterialsHeader from "../DashboardMaterialsHeader/DashboardMaterialsHeader";
import MobileFilterModal from "@/components/molecules/MobileFilterModal/MobileFilterModal";

import { useGetSavedMaterials } from "../../hooks/useGetSavedMaterials";

const SavedMaterialWrapper = () => {
  const {
    materials,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    submittedQuery,
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
  } = useGetSavedMaterials({ limit: 10 });

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
              onSearchSubmit={handleSearch}
              setSearch={handleSearchChange}
              title="Saved Materials"
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
                emptyTitle="No saved materials yet"
                emptyDescription={
                  hasFilters || submittedQuery
                    ? "Try changing your search or filters to find saved materials."
                    : "Materials you save will appear here."
                }
              />
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

export default SavedMaterialWrapper;
