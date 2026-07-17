import Button from "@/components/atoms/Button/Button";
import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import CardIcon from "@/components/atoms/icons/CardIcon";

const OrderSummary = ({
  href,
  handlePayment,
  actionTitle,
  variant,
}: {
  href?: string;
  actionTitle: string;
  handlePayment?: () => void;
  variant?: "primary" | "secondary";
}) => {
  return (
    <FilterSectionWrapper variant={variant}>
      <FilterTitle title="ORDER SUMMARY" />
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs">Subtotal (3 items)</p>
              <p className="text-sm"> ₦161,000</p>
            </div>{" "}
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs">Tax</p>
              <p className="text-sm">₦16,100</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs">Shipping</p>
              <p className="text-sm"> ₦9,000</p>
            </div>
          </div>
          <div className="pt-3.5 border-t border-[#ECECEC] flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Total</p>
            <p className="text-sm font-semibold">₦16,100</p>
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
