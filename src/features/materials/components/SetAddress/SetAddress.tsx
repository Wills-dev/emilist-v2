import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";

const SetAddress = () => {
  return (
    <FilterSectionWrapper>
      <FilterTitle title="SET Delivery ADDRESS" />
      <div className="flex items-center gap-1.75 h-7.75">
        <input
          type="text"
          id=""
          className=" h-full bg-[#FDFDFD] w-full flex-1 rounded-[6.75px] border border-[#00000000] px-2 text-xs"
          placeholder="Enter full address"
        />
      </div>
    </FilterSectionWrapper>
  );
};

export default SetAddress;
