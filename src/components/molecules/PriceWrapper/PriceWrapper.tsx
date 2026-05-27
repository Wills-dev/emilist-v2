import Price from "@/components/atoms/Price/Price";

const PriceWrapper = ({
  price,
  currency,
  unit,
}: {
  price: number;
  currency: string;
  unit?: string;
}) => {
  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <span className="block text-[#707471] italic text-xs">from</span>
      <Price price={price} currency={currency} unit={unit} />
    </div>
  );
};

export default PriceWrapper;
