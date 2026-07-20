import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import SearchableSelect from "@/components/atoms/SearchableSelect/SearchableSelect";

import { FilterState } from "@/lib/hooks/useFilters";
import { selectOption } from "@/lib/types";

const MarketplaceLocationFilter = ({
  filters,
  setFilter,
  options,
  clearFilter,
  variant,
}: {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  options: selectOption[] | string[];
  variant?: "primary" | "secondary" | "tertiary";
  clearFilter: (key: keyof FilterState) => void;
}) => {
  return (
    <FilterSectionWrapper variant={variant}>
      {" "}
      <div className="flex items-center justify-between gap-2.5">
        <FilterTitle title="Location" />
        <div className="max-w-23.5 w-full">
          <SearchableSelect
            value={filters.location || ""}
            onValueChange={(value) => setFilter("location", value)}
            options={options}
            placeholder="Lagos"
            searchPlaceholder="Search locations..."
          />
        </div>
      </div>
      <div className=" w-full flex items-center gap-2.5 flex-wrap">
        <FilterSelector
          value={"All"}
          onClick={() => clearFilter("location")}
          variant={!filters.location ? "secondary" : "primary"}
          parentVariant={variant}
        />
        {filters?.location && (
          <FilterSelector
            value={filters.location}
            onClick={() => setFilter("location", "")}
            variant="secondary"
            parentVariant={variant}
          />
        )}
      </div>
    </FilterSectionWrapper>
  );
};

export default MarketplaceLocationFilter;
