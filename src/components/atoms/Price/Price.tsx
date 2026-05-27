import { getCurrencySign } from "@/lib/helpers/currentSign";
import { formatAmount, numberWithCommas } from "@/lib/helpers/formatNumbers";

const Price = ({
  currency,
  price,
  showFullPrice,
  unit,
}: {
  currency: string;
  price: number;
  showFullPrice?: boolean;
  unit?: string;
}) => {
  const currencySign = getCurrencySign(currency);

  const formattedPrice = showFullPrice
    ? numberWithCommas(price)
    : formatAmount(price);

  return (
    <p className="font-semibold text-[#18A154] max-sm:text-sm lowercase">
      {currencySign}
      {formattedPrice}
      {unit ? `/${unit}` : ""}
    </p>
  );
};

export default Price;
