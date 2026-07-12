import Price from "@/components/atoms/Price/Price";

const PriceWrapper = ({
  price,
  currency,
  unit,
  title = "from",
}: {
  price: number;
  currency: string;
  unit?: string;
  title?: string;
}) => {
  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <span className="block text-[#707471] italic text-xs">{title}</span>
      <Price price={price} currency={currency} unit={unit} />
    </div>
  );
};

export default PriceWrapper;
