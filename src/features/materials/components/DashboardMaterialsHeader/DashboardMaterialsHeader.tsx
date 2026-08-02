"use client";

import Link from "next/link";

import MarketplaceSavedButton from "@/components/atoms/MarketplaceSavedButton/MarketplaceSavedButton";
import ShopBag from "@/components/atoms/icons/ShopBag";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import { dashbaordMarketplaceTabs } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";
import { useGetCartItems } from "../../hooks/useGetCartItems";
import { getCartItemCount } from "../../helpers/cart";
import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";

const DashboardMaterialsHeader = ({
  onSearchSubmit,
  setSearch,
  title = "Welcome to the marketplace",
  saved,
}: {
  onSearchSubmit: (query: string) => void;
  setSearch: (search: string) => void;
  title?: string;
  saved?: boolean;
}) => {
  const { cart } = useGetCartItems();
  const cartCount = getCartItemCount(cart);

  return (
    <div className="space-y-6 sm:pb-6 pb-4 border-b border-[#F1F2F9]">
      <DashboardTitle title={title} size="medium" />
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="min-w-72.5">
          <MarketplaceTab tabContent={dashbaordMarketplaceTabs} />
        </div>
        <div className="max-w-86.25 w-full min-w-72.5 flex items-center gap-2.5 flex-wrap">
          <div className="max-w-64.25 w-full">
            <SearchBar
              setSearch={setSearch}
              onSubmit={onSearchSubmit}
              placeholder="Search materials..."
              variant="secondary"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <MarketplaceSavedButton
              href={routes?.dashboardLinks?.savedMaterials}
              label="View saved materials"
              active={saved}
            />
            <Link
              href={routes?.dashboardLinks?.dashboardCart}
              aria-label={`View cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              className="relative bg-[#F6F7F9] rounded-full h-8.5 w-8.5 flex justify-center items-center text-[#737774]"
            >
              <ShopBag />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex min-w-4.5 h-4.5 items-center justify-center rounded-full bg-[#FF5D7A] px-1 text-[10px] font-semibold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMaterialsHeader;
