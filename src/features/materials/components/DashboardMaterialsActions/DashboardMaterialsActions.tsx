import BackButton from "@/components/atoms/BackButton/BackButton";
import FilterIcon from "@/components/atoms/icons/FilterIcon";
import MarketplaceActionTitle from "@/components/atoms/MarketplaceActionTitle/MarketplaceActionTitle";
import Select from "@/components/atoms/Select/Select";
import { sortOptions } from "@/lib/constants/filter";
import { routes } from "@/lib/helpers/routes";

const DashboardMaterialsActions = ({
  onCloseFilter,
  onOpenFilter,
  tab,
  sortBy,
  onSortChange,
}: {
  onCloseFilter: () => void;
  onOpenFilter: () => void;
  tab: string;
  sortBy?: string | null;
  onSortChange?: (value: string) => void;
}) => {
  const isFilterOpen = tab === "filter";

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        {isFilterOpen ? (
          <BackButton onClose={onCloseFilter} />
        ) : (
          <Select
            options={sortOptions}
            variant="secondary"
            fontSize="14px"
            value={sortBy ?? ""}
            onChange={(event) => onSortChange?.(event.target.value)}
            placeholder="Sort by"
          />
        )}
        <button
          type="button"
          onClick={onOpenFilter}
          className="flex items-center cursor-pointer gap-2 bg-[#F9F9F9] hover:shadow transition-all duration-300 sm:h-8.5 h-7.5 px-3 rounded-[24px] text-[#5D6771] text-sm xl:hidden"
        >
          <FilterIcon />
        </button>
      </div>
      <div className="flex items-center gap-5">
        <MarketplaceActionTitle
          title="Manage orders"
          link={routes.dashboardLinks.orders}
        />
        <MarketplaceActionTitle
          title="Manage listed items"
          link={routes.dashboardLinks.listedMaterials}
        />
        <MarketplaceActionTitle title="Post material" link="" />
      </div>
    </div>
  );
};

export default DashboardMaterialsActions;
