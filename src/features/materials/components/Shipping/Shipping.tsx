import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";

const Shipping = ({
  icon,
  title,
  desc,
  variant,
}: {
  title: string;
  icon: React.ReactElement;
  desc: string;
  variant?: "primary" | "secondary" | "tertiary";
}) => {
  return (
    <FilterSectionWrapper variant={variant}>
      <div className="flex items-center justify-between gap-4">
        <FilterTitle icon={icon} title={title} />
        <p className="text-[#717182] text-[10px]">{desc}</p>
      </div>
    </FilterSectionWrapper>
  );
};

export default Shipping;
