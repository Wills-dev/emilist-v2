"use client";

import Container from "@/components/atoms/Container/Container";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";

import { marketplaceTabs } from "@/lib/constants";
import { useFilters } from "@/lib/hooks/useFilters";
import MarketplaceFilterBtns from "@/components/molecules/MarketplaceFilterBtns/MarketplaceFilterBtns";
import MarketplaceFilter from "@/components/molecules/MarketplaceFilter/MarketplaceFilter";

const MarketplaceJobWrapper = () => {
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

  return (
    <div>
      <MarketplaceBanner
        bgText="verified job offers around"
        endText="your location, in minutes"
        src="/assets/images/jobs.svg"
        type="jobs"
      />
      <Container>
        <div className="sm:pt-10 pt-5">
          <div className="flex">
            <div className="max-w-96.75 w-full min-w-72.5 space-y-6">
              <MarketplaceTab tabContent={marketplaceTabs} />
              <MarketplaceFilterBtns
                onClose={() => setTab("")}
                onOpen={() => setTab("filter")}
                onReset={resetFilters}
                hasFilter={hasFilters}
              />
              <MarketplaceFilter
                showCategory={true}
                filters={filters}
                setFilter={setFilter}
                toggleCategory={toggleCategory}
                isCategorySelected={isCategorySelected}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarketplaceJobWrapper;
