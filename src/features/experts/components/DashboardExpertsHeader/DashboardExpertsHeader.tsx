"use client";

import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";
import LikeIcon from "@/components/atoms/icons/LikeIcon";
import MarketplaceSavedButton from "@/components/atoms/MarketplaceSavedButton/MarketplaceSavedButton";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import { dashbaordMarketplaceTabs } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";

const DashboardExpertsHeader = ({
  onSearchSubmit,
  setSearch,
  saved = false,
  title = "Welcome to the marketplace",
}: {
  onSearchSubmit: (query: string) => void;
  setSearch: (search: string) => void;
  saved?: boolean;
  title?: string;
}) => (
  <div className="grid grid-cols-1 gap-4 border-b border-[#F1F2F9] pb-4 sm:grid-cols-[minmax(290px,1fr)_auto] sm:gap-6 sm:pb-6">
    <DashboardTitle
      title={title}
      size="medium"
      className="order-2 sm:order-1 sm:col-span-2"
      icon={
        saved ? (
          <span className="text-[#FF5D7A]">
            <LikeIcon />
          </span>
        ) : undefined
      }
    />
    <div className="order-1 max-w-78.5 min-w-72.5 sm:order-2">
      <MarketplaceTab tabContent={dashbaordMarketplaceTabs} />
    </div>
    <div className="order-3 flex w-full max-w-86.25 min-w-72.5 items-center gap-2.5">
      <div className="w-full max-w-78">
        <SearchBar
          setSearch={setSearch}
          onSubmit={onSearchSubmit}
          placeholder="Search experts"
          variant="secondary"
        />
      </div>
      <MarketplaceSavedButton
        href={routes.dashboardLinks.savedExperts}
        label="View saved experts"
        active={saved}
      />
    </div>
  </div>
);

export default DashboardExpertsHeader;
