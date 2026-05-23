import { getCurrencySign } from "@/lib/helpers/currentSign";
import { formatAmount, numberWithCommas } from "@/lib/helpers/formatNumbers";

const Price = ({
  currency,
  price,
  showFullPrice,
}: {
  currency: string;
  price: number;
  showFullPrice?: boolean;
}) => {
  const currencySign = getCurrencySign(currency);

  const formattedPrice = showFullPrice
    ? numberWithCommas(price)
    : formatAmount(price);

  return (
    <p className="font-semibold text-[#18A154]">
      {currencySign}
      {formattedPrice}
    </p>
  );
};

export default Price;
