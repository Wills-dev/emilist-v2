"use client";

import Link from "next/link";

import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";
import LikeIcon from "@/components/atoms/icons/LikeIcon";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import { dashbaordMarketplaceTabs } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";

const DashboardJobsHeader = ({
  onSearchSubmit,
  setSearch,
  title = "Welcome to the marketplace",
  saved = false,
}: {
  onSearchSubmit: (query: string) => void;
  setSearch: (search: string) => void;
  title?: string;
  saved?: boolean;
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
          placeholder="Search"
          variant="secondary"
        />
      </div>
      <Link
        href={routes.dashboardLinks.savedJobs}
        aria-label="View saved jobs"
        aria-current={saved ? "page" : undefined}
        className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#F6F7F9] ${saved ? "text-[#FF5D7A]" : "text-[#737774]"}`}
      >
        <LikeIcon />
      </Link>
    </div>
  </div>
);

export default DashboardJobsHeader;
