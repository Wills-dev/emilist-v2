"use client";

import Container from "@/components/atoms/Container/Container";
import SavedFilterBtn from "@/components/atoms/SavedFilterBtn/SavedFilterBtn";
import MarketplaceActionBtns from "@/components/molecules/MarketplaceActionBtns/MarketplaceActionBtns";
import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MarketplaceFilter from "@/components/molecules/MarketplaceFilter/MarketplaceFilter";
import MarketplaceFilterBtns from "@/components/molecules/MarketplaceFilterBtns/MarketplaceFilterBtns";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import MobileFilterModal from "@/components/molecules/MobileFilterModal/MobileFilterModal";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import { countriesAndStates } from "@/lib/constants/countries";
import { marketplaceTabs } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";
import { useFilters } from "@/lib/hooks/useFilters";
import { expertServices } from "../../constants";
import DashboardExpertCardWrap from "../DashboardExpertCardWrap/DashboardExpertCardWrap";

const MarketplaceExpertWrapper = () => {
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
    handleSearch,
    handleSearchChange,
    submittedQuery,
  } = useFilters();

  const filter = (
    <MarketplaceFilter
      showCategory
      categoryTitle="Service Category"
      categories={expertServices}
      filters={filters}
      setFilter={setFilter}
      setPriceRange={setPriceRange}
      toggleCategory={toggleCategory}
      isCategorySelected={isCategorySelected}
      locations={countriesAndStates}
      showLocation
      showPrice
      priceTitle="Payment Range"
      showNoticePeriod
      showLevel
      showRating
      clearFilter={clearFilter}
    />
  );

  return (
    <div>
      <MarketplaceBanner
        bgText="vetted service providers"
        endText="around you in minutes"
        src="/assets/images/experts.svg"
        type="experts"
        className="bg-linear-to-b from-[#0F6B4B] to-[#215342]"
      />
      <Container>
        <div className="pb-20 pt-5 sm:pt-10">
          <div className="flex justify-between gap-2 max-xl:flex-col xl:gap-10">
            <aside className="w-full min-w-72.5 max-w-96.75 space-y-6">
              <MarketplaceTab tabContent={marketplaceTabs} />
              <MarketplaceFilterBtns
                onReset={resetFilters}
                hasFilter={hasFilters}
              />
              <div className="w-full max-xl:hidden">{filter}</div>
            </aside>

            <div className="w-full max-w-197.75 space-y-16">
              <div className="space-y-4 lg:space-y-8">
                <div className="space-y-2">
                  <h1 className="font-exo text-[20px] font-semibold leading-10 tracking-[0%] sm:text-[32px]">
                    Welcome to the marketplace
                  </h1>
                  <p className="text-sm tracking-[-3%] text-[#5E625F]">
                    Explore all the experienced, verified experts around you on
                    Emilist
                  </p>
                </div>
                <div className="flex w-full items-center justify-between gap-4 sm:gap-10">
                  <div className="w-full flex-1 py-2.5">
                    <SearchBar
                      setSearch={handleSearchChange}
                      onSubmit={handleSearch}
                      placeholder="Search for jobs, experts or materials..."
                      variant="secondary"
                    />
                  </div>
                  <SavedFilterBtn />
                </div>
              </div>

              <div className="space-y-4">
                <MarketplaceActionBtns
                  onClose={() => setTab("")}
                  onOpen={() => setTab("filter")}
                  tab={tab}
                  actionLink={routes.marketplace.experts}
                  actionTitle="Hire experts directly"
                  sortBy={filters.sortBy}
                  onSortChange={(value) => setFilter("sortBy", value)}
                />
                <DashboardExpertCardWrap
                  query={submittedQuery}
                  filters={filters}
                  publicLinks
                  batchSize={6}
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
        {filter}
      </MobileFilterModal>
    </div>
  );
};

export default MarketplaceExpertWrapper;
