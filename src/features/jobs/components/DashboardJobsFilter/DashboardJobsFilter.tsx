import MarketplaceFilter, {
  MarketplaceFilterProps,
} from "@/components/molecules/MarketplaceFilter/MarketplaceFilter";
import { countriesAndStates } from "@/lib/constants/countries";
import { jobCategories } from "../../constants";

type DashboardJobsFilterProps = Pick<
  MarketplaceFilterProps,
  | "clearFilter"
  | "filters"
  | "isCategorySelected"
  | "noticePeriodOptions"
  | "noticePeriodTitle"
  | "setFilter"
  | "setPriceRange"
  | "toggleCategory"
>;

const DashboardJobsFilter = (props: DashboardJobsFilterProps) => (
  <MarketplaceFilter
    {...props}
    showCategory
    categories={jobCategories}
    showPrice
    showLocation
    locations={countriesAndStates}
    showNoticePeriod
    showLevel
    showRating
    variant="tertiary"
  />
);

export default DashboardJobsFilter;
