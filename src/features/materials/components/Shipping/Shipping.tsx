import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";

const Shipping = ({
  icon,
  title,
  desc,
}: {
  title: string;
  icon: React.ReactElement;
  desc: string;
}) => {
  return (
    <FilterSectionWrapper>
      <div className="flex items-center justify-between gap-4">
        <FilterTitle icon={icon} title={title} />
        <p className="text-[#717182] text-[10px]">{desc}</p>
      </div>
    </FilterSectionWrapper>
  );
};

export default Shipping;
