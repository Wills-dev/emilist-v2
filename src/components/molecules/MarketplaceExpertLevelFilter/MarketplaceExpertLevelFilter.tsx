import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import { expertLevels } from "@/lib/constants";
import { FilterState } from "@/lib/hooks/useFilters";

const MarketplaceExpertLevelFilter = ({
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
  variant?: "primary" | "secondary" | "tertiary";
  clearFilter: (key: keyof FilterState) => void;
}) => {
  return (
    <FilterSectionWrapper variant={variant}>
      <FilterTitle title="experience level" />
      <div className="space-y-3 w-full">
        <FilterSelector
          value={"All"}
          onClick={() => clearFilter("level")}
          variant={!filters.level ? "secondary" : "primary"}
          parentVariant={variant}
        />
        <div className="flex items-center gap-2.5 flex-wrap w-full">
          {expertLevels?.map((level) => (
            <FilterSelector
              key={level}
              value={level}
              onClick={() => setFilter("level", level)}
              variant={filters.level === level ? "secondary" : "primary"}
              parentVariant={variant}
            />
          ))}
        </div>
      </div>
    </FilterSectionWrapper>
  );
};

export default MarketplaceExpertLevelFilter;
