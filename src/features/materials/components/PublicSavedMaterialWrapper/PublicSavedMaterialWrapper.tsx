"use client";

import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import Container from "@/components/atoms/Container/Container";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import MarketplaceFilterBtns from "@/components/molecules/MarketplaceFilterBtns/MarketplaceFilterBtns";
import MarketplaceFilter from "@/components/molecules/MarketplaceFilter/MarketplaceFilter";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import SavedFilterBtn from "@/components/atoms/SavedFilterBtn/SavedFilterBtn";
import MarketplaceActionBtns from "@/components/molecules/MarketplaceActionBtns/MarketplaceActionBtns";
import CartRecord from "../CartRecord/CartRecord";
import MarketplaceMaterialCardWrap from "../MarketplaceMaterialCardWrap/MarketplaceMaterialCardWrap";
import MobileFilterModal from "@/components/molecules/MobileFilterModal/MobileFilterModal";

import { useGetSavedMaterials } from "../../hooks/useGetSavedMaterials";
import { routes } from "@/lib/helpers/routes";
import { marketplaceTabs } from "@/lib/constants";
import { expertServices } from "@/features/experts/constants";
import { countriesAndStates } from "@/lib/constants/countries";

const PublicSavedMaterialWrapper = () => {
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
  return (
    <div>
      <MarketplaceBanner
        bgText="verified merchants &"
        endText="materials for your projects"
        src="/assets/images/materials.svg"
        type="jobs"
        className="bg-[#1A201B]"
      />
      <Container>
        <div className="sm:pt-10 pt-5">
          <div className="flex max-xl:flex-col justify-between xl:gap-10 gap-2">
            <div className="max-w-96.75 w-full min-w-72.5 space-y-6">
              <MarketplaceTab tabContent={marketplaceTabs} />
              <MarketplaceFilterBtns
                onReset={resetFilters}
                hasFilter={hasFilters}
              />
              <div className="w-full max-xl:hidden">
                <MarketplaceFilter
                  showCategory={true}
                  filters={filters}
                  setFilter={setFilter}
                  toggleCategory={toggleCategory}
                  isCategorySelected={isCategorySelected}
                  setPriceRange={setPriceRange}
                  categories={expertServices}
                  locations={countriesAndStates}
                  showLocation
                  showPrice
                  showRating
                  showDeliveryTime
                  clearFilter={clearFilter}
                />
              </div>
            </div>
            <div className="max-w-197.75 w-full space-y-16">
              <div className="lg:space-y-8 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h6 className="font-exo font-semibold sm:text-[32px] text-[20px] tracking-[0%] leading-10">
                      Saved Materials
                    </h6>
                  </div>
                </div>
                <div className="w-full flex sm:items-center justify-between sm:gap-10 gap-2 max-sm:flex-col">
                  <div className="flex-1 w-full py-2.5">
                    <SearchBar
                      setSearch={handleSearchChange}
                      onSubmit={handleSearch}
                      placeholder="Search for jobs, xexperts or materials..."
                      variant="secondary"
                    />
                  </div>
                  <div className="flex items-center sm:gap-4 gap-2">
                    <SavedFilterBtn saved />
                    <CartRecord />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <MarketplaceActionBtns
                  onClose={() => setTab("")}
                  onOpen={() => setTab("filter")}
                  tab={tab}
                  actionLink={routes?.postMaterial}
                  actionTitle="Post materials"
                  sortBy={filters.sortBy}
                  onSortChange={(value) => setFilter("sortBy", value)}
                />
                <MarketplaceMaterialCardWrap
                  getReviewsHref={routes.marketplace.materialInfoReviews}
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
        </div>
      </Container>
      <MobileFilterModal
        open={tab === "filter"}
        onClose={(open) => !open && setTab("")}
        onReset={resetFilters}
        hasFilters={hasFilters}
      >
        <MarketplaceFilter
          showCategory
          filters={filters}
          setFilter={setFilter}
          toggleCategory={toggleCategory}
          isCategorySelected={isCategorySelected}
          setPriceRange={setPriceRange}
          categories={expertServices}
          locations={countriesAndStates}
          showLocation
          showPrice
          showRating
          showDeliveryTime
          clearFilter={clearFilter}
        />
      </MobileFilterModal>
    </div>
  );
};

export default PublicSavedMaterialWrapper;
