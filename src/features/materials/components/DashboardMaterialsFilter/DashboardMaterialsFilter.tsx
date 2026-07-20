import MarketplaceFilter, {
  MarketplaceFilterProps,
} from "@/components/molecules/MarketplaceFilter/MarketplaceFilter";
import { expertServices } from "@/features/experts/constants";
import { countriesAndStates } from "@/lib/constants/countries";

type DashboardMaterialsFilterProps = Pick<
  MarketplaceFilterProps,
  | "clearFilter"
  | "filters"
  | "isCategorySelected"
  | "setFilter"
  | "setPriceRange"
  | "toggleCategory"
>;

const DashboardMaterialsFilter = (props: DashboardMaterialsFilterProps) => {
  return (
    <MarketplaceFilter
      {...props}
      showCategory
      categories={expertServices}
      locations={countriesAndStates}
      showLocation
      showPrice
      showNoticePeriod
      showLevel
      showRating
      variant="tertiary"
    />
  );
};

export default DashboardMaterialsFilter;
