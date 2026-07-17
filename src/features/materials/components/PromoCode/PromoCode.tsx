import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import ClipIcon from "@/components/atoms/icons/ClipIcon";

const PromoCode = () => {
  return (
    <FilterSectionWrapper>
      <FilterTitle icon={<ClipIcon />} title="PROMO CODE" />
      <div className="flex items-center gap-1.75 h-7.75">
        <input
          type="text"
          id=""
          className=" h-full bg-[#FDFDFD] w-full flex-1 rounded-[6.75px] border border-[#00000000] px-2 text-xs"
          placeholder="Enter promo code"
        />
        <button
          type="button"
          className="text-xs font-medium border border-[#F1F2F9] py-1.75 px-3.5 rounded-[6.75px] bg-white h-full cursor-pointer"
        >
          Apply
        </button>
      </div>
    </FilterSectionWrapper>
  );
};

export default PromoCode;
