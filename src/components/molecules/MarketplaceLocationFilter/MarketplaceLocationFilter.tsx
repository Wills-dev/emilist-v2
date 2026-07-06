import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import Select from "@/components/atoms/Select/Select";

import { FilterState } from "@/lib/hooks/useFilters";
import { selectOption } from "@/lib/types";

const MarketplaceLocationFilter = ({
  filters,
  setFilter,
  options,
  clearFilter,
}: {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  options: selectOption[] | string[];
  clearFilter: (key: keyof FilterState) => void;
}) => {
  return (
    <FilterSectionWrapper>
      {" "}
      <div className="flex items-center justify-between gap-2.5">
        <FilterTitle title="Location" />
        <div className="max-w-23.5 w-full">
          <Select
            id=""
            name=""
            value={filters.location || ""}
            onChange={(e) => setFilter("location", e.target.value)}
            options={options}
            placeholder="Lagos"
          />
        </div>
      </div>
      <div className=" w-full flex items-center gap-2.5 flex-wrap">
        <FilterSelector
          value={"All"}
          onClick={() => clearFilter("location")}
          variant={!filters.location ? "secondary" : "primary"}
        />
        {filters?.location && (
          <FilterSelector
            value={filters.location}
            onClick={() => setFilter("location", "")}
            variant="secondary"
          />
        )}
      </div>
    </FilterSectionWrapper>
  );
};

export default MarketplaceLocationFilter;
