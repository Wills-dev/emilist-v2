import MarketplaceFilter, { MarketplaceFilterProps } from "@/components/molecules/MarketplaceFilter/MarketplaceFilter";
import { countriesAndStates } from "@/lib/constants/countries";
import { expertServices } from "../../constants";

type DashboardExpertsFilterProps = Pick<MarketplaceFilterProps, "clearFilter" | "filters" | "isCategorySelected" | "setFilter" | "setPriceRange" | "toggleCategory">;

const DashboardExpertsFilter = (props: DashboardExpertsFilterProps) => (
  <MarketplaceFilter
    {...props}
    showCategory
    categoryTitle="Service Category"
    categories={expertServices}
    showPrice
    priceTitle="Payment"
    showLocation
    locations={countriesAndStates}
    showLevel
    showRating
    variant="tertiary"
  />
);

export default DashboardExpertsFilter;
