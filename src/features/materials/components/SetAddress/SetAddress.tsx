import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";

const SetAddress = ({
  variant,
  value,
  onChange,
}: {
  variant?: "primary" | "secondary" | "tertiary";
  value?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <FilterSectionWrapper variant={variant}>
      <FilterTitle title="SET Delivery ADDRESS" />
      <div className="flex items-center gap-1.75 h-7.75">
        <input
          type="text"
          id="shipping-address"
          name="shippingAddress"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          autoComplete="shipping street-address"
          className={`h-full bg-[#FDFDFD] w-full flex-1 rounded-[6.75px]  px-2 text-xs border ${variant === "secondary" ? "border-gray-200" : "border-[#00000000]"}`}
          placeholder="Enter full address"
        />
      </div>
    </FilterSectionWrapper>
  );
};

export default SetAddress;
