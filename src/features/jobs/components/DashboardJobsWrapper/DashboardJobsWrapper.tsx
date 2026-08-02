"use client";

import { motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import BackButton from "@/components/atoms/BackButton/BackButton";
import FilterIcon from "@/components/atoms/icons/FilterIcon";
import MarketplaceActionTitle from "@/components/atoms/MarketplaceActionTitle/MarketplaceActionTitle";
import Select from "@/components/atoms/Select/Select";
import MarketplaceFilterBtns from "@/components/molecules/MarketplaceFilterBtns/MarketplaceFilterBtns";
import MobileFilterModal from "@/components/molecules/MobileFilterModal/MobileFilterModal";
import { sortOptions } from "@/lib/constants/filter";
import { routes } from "@/lib/helpers/routes";
import { useFilters } from "@/lib/hooks/useFilters";
import DashboardJobCardWrap from "../DashboardJobCardWrap/DashboardJobCardWrap";
import DashboardJobsFilter from "../DashboardJobsFilter/DashboardJobsFilter";
import DashboardJobsHeader from "../DashboardJobsHeader/DashboardJobsHeader";

const DashboardJobsWrapper = ({ saved = false }: { saved?: boolean }) => {
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
            <DashboardJobsHeader
              onSearchSubmit={handleSearch}
              setSearch={handleSearchChange}
              title={saved ? "Saved Jobs" : "Welcome to the marketplace"}
              saved={saved}
            />
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {saved && <BackButton />}
                  <Select
                    options={sortOptions}
                    variant="secondary"
                    fontSize="14px"
                    value={filters.sortBy ?? ""}
                    onChange={(event) => setFilter("sortBy", event.target.value)}
                    placeholder="Sort by"
                  />
                  <button
                    type="button"
                    aria-label="Open job filters"
                    onClick={() => setTab("filter")}
                    className="flex h-7.5 cursor-pointer items-center gap-2 rounded-3xl bg-[#F9F9F9] px-3 text-sm text-[#5D6771] transition-shadow hover:shadow sm:h-8.5 xl:hidden"
                  >
                    <FilterIcon />
                  </button>
                </div>
                <div className="flex items-center gap-5">
                  <div className="max-sm:hidden">
                    <MarketplaceActionTitle title="Offer a service" link={routes.joinExpert} />
                  </div>
                  <MarketplaceActionTitle title="Post a job" link={routes.postJob} />
                </div>
              </div>
              <DashboardJobCardWrap
                query={submittedQuery}
                filters={filters}
                savedOnly={saved}
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
          <DashboardJobsFilter {...filterProps} />
        </motion.aside>
      </motion.div>
      <MobileFilterModal
        open={tab === "filter"}
        onClose={(open) => !open && setTab("")}
        onReset={resetFilters}
        hasFilters={hasFilters}
      >
        <DashboardJobsFilter {...filterProps} />
      </MobileFilterModal>
    </Container>
  );
};

export default DashboardJobsWrapper;
