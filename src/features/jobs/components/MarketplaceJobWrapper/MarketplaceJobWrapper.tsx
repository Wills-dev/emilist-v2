"use client";

import { AnimatePresence, motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MarketplaceFilterBtns from "@/components/molecules/MarketplaceFilterBtns/MarketplaceFilterBtns";
import MarketplaceFilter from "@/components/molecules/MarketplaceFilter/MarketplaceFilter";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import SavedFilterBtn from "@/components/atoms/SavedFilterBtn/SavedFilterBtn";
import MarketplaceJobActionBtns from "@/components/molecules/MarketplaceJobActionBtns/MarketplaceJobActionBtns";
import JobCard from "../JobCard/JobCard";

import { marketplaceTabs } from "@/lib/constants";
import { useFilters } from "@/lib/hooks/useFilters";
import { expertServices } from "@/features/experts/constants";
import { countriesAndStates } from "@/lib/constants/countries";
import { useGeneralSearch } from "@/lib/hooks/useGeneralSearch";

const MarketplaceJobWrapper = () => {
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
                  showNoticePeriod
                  showLevel
                  showRating
                  clearFilter={clearFilter}
                />
              </div>
            </div>
            <div className="max-w-197.75 w-full space-y-16">
              <div className="lg:space-y-8 space-y-4">
                <div className="space-y-2">
                  <h6 className="font-exo font-semibold sm:text-[32px] text-[20px] tracking-[0%] leading-10">
                    Welcome to the marketplace
                  </h6>
                  <p className="text-[#5E625F] text-sm tracking-[-3%]">
                    Explore all the latest verified job opportunities around you
                    on Emilist
                  </p>
                </div>
                <div className="w-full flex items-center justify-between sm:gap-10 gap-4">
                  <div className="flex-1 w-full py-2.5">
                    <SearchBar
                      setSearch={setSearch}
                      onSubmit={handleSubmit}
                      placeholder="Search for jobs, experts or materials..."
                      variant="secondary"
                    />
                  </div>
                  <SavedFilterBtn />
                </div>
              </div>
              <div className="space-y-4">
                <MarketplaceJobActionBtns
                  onClose={() => setTab("")}
                  onOpen={() => setTab("filter")}
                  onReset={resetFilters}
                  hasFilter={hasFilters}
                  tab={tab}
                />
                <AnimatePresence mode="wait">
                  {tab === "" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex flex-wrap gap-6 xl:max-h-screen xl:overflow-y-auto no-scrollbar"
                    >
                      <JobCard />
                      <JobCard />
                      <JobCard />
                      <JobCard />
                      <JobCard />
                      <JobCard />
                      <JobCard />
                      <JobCard />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-full xl:hidden"
                    >
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
                        showNoticePeriod
                        showLevel
                        showRating
                        clearFilter={clearFilter}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarketplaceJobWrapper;
