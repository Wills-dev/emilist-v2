import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import { FilterState } from "@/lib/hooks/useFilters";

const deliveryTimes = [
  { label: "Immediately", value: "immediately" },
  { label: "1 day", value: "1_day" },
  { label: "2 - 3 days", value: "2_3_days" },
  { label: "4 - 5 days", value: "4_5_days" },
  { label: "1 week", value: "1_week" },
  { label: "2 weeks", value: "2_weeks" },
];

const MarketplaceDeliveryTimeFilter = ({
  filters,
  setFilter,
  clearFilter,
  variant,
}: {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  clearFilter: (key: keyof FilterState) => void;
  variant?: "primary" | "secondary" | "tertiary";
}) => (
  <FilterSectionWrapper variant={variant}>
    <FilterTitle title="DELIVERY TIME" />
    <div className="flex w-full flex-wrap items-center gap-2.5">
      <FilterSelector
        value="All"
        onClick={() => clearFilter("deliveryTime")}
        variant={!filters.deliveryTime ? "secondary" : "primary"}
        parentVariant={variant}
      />
      {deliveryTimes.map(({ label, value }) => (
        <FilterSelector
          key={value}
          value={label}
          onClick={() => setFilter("deliveryTime", value)}
          variant={
            filters.deliveryTime === value ? "secondary" : "primary"
          }
          parentVariant={variant}
        />
      ))}
    </div>
  </FilterSectionWrapper>
);

export default MarketplaceDeliveryTimeFilter;
