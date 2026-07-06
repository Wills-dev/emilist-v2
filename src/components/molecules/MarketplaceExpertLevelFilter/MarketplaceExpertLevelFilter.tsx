import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import { expertLevels } from "@/lib/constants";
import { FilterState } from "@/lib/hooks/useFilters";

const MarketplaceExpertLevelFilter = ({
  filters,
  setFilter,
  clearFilter,
}: {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  clearFilter: (key: keyof FilterState) => void;
}) => {
  return (
    <FilterSectionWrapper>
      <FilterTitle title="experience level" />
      <div className="space-y-3 w-full">
        <FilterSelector
          value={"All"}
          onClick={() => clearFilter("level")}
          variant={!filters.level ? "secondary" : "primary"}
        />
        <div className="flex items-center gap-2.5 flex-wrap w-full">
          {expertLevels?.map((level) => (
            <FilterSelector
              key={level}
              value={level}
              onClick={() => setFilter("level", level)}
              variant={filters.level === level ? "secondary" : "primary"}
            />
          ))}
        </div>
      </div>
    </FilterSectionWrapper>
  );
};

export default MarketplaceExpertLevelFilter;
