import Button from "@/components/atoms/Button/Button";
import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import CardIcon from "@/components/atoms/icons/CardIcon";
import { getCurrencySign } from "@/lib/helpers/currencySign";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import { CartOrderSummary } from "../../types";

const OrderSummary = ({
  href,
  handlePayment,
  actionTitle,
  variant,
  productCount = 0,
  orderSummary,
  currency = "NGN",
}: {
  href?: string;
  actionTitle: string;
  handlePayment?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  productCount?: number;
  orderSummary?: CartOrderSummary;
  currency?: string;
}) => {
  const currencySign = getCurrencySign(currency);
  const summary = orderSummary ?? {
    subtotalAmount: 0,
    discountAmount: 0,
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: 0,
  };

  return (
    <FilterSectionWrapper variant={variant}>
      <FilterTitle title="ORDER SUMMARY" />
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs">
                Subtotal ({productCount} {productCount === 1 ? "item" : "items"}
                )
              </p>
              <p className="text-sm">
                {currencySign}
                {numberWithCommas(summary.subtotalAmount)}
              </p>
            </div>{" "}
            {summary.discountAmount > 0 && (
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs">Discount</p>
                <p className="text-sm">
                  -{currencySign}
                  {numberWithCommas(summary.discountAmount)}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs">Tax</p>
              <p className="text-sm">
                {currencySign}
                {numberWithCommas(summary.taxAmount)}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs">Shipping</p>
              <p className="text-sm">
                {currencySign}
                {numberWithCommas(summary.shippingAmount)}
              </p>
            </div>
          </div>
          <div className="pt-3.5 border-t border-[#ECECEC] flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Total</p>
            <p className="text-sm font-semibold">
              {currencySign}
              {numberWithCommas(summary.totalAmount)}
            </p>
          </div>
        </div>
        <Button
          href={href}
          onClick={handlePayment}
          variant="primary"
          type="submit"
          className="w-full h-8.75"
        >
          <span>
            <CardIcon />
          </span>
          <span>{actionTitle}</span>
        </Button>
      </div>
    </FilterSectionWrapper>
  );
};

export default OrderSummary;
