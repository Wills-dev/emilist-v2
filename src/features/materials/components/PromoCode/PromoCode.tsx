"use client";

import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import ClipIcon from "@/components/atoms/icons/ClipIcon";
import { Loader2 } from "lucide-react";
import { useApplyDiscountCode } from "../../hooks/useApplyDiscountCode";

const PromoCode = ({
  variant,
}: {
  variant?: "primary" | "secondary" | "tertiary";
}) => {
  const { code, handleApplyDiscount, handleCodeChange, isApplyingDiscount } =
    useApplyDiscountCode();

  return (
    <FilterSectionWrapper variant={variant}>
      <FilterTitle icon={<ClipIcon />} title="PROMO CODE" />
      <form
        onSubmit={handleApplyDiscount}
        className="flex items-center gap-1.75 h-7.75"
      >
        <input
          type="text"
          id="discount-code"
          value={code}
          onChange={handleCodeChange}
          disabled={isApplyingDiscount}
          className=" h-full bg-[#FDFDFD] w-full flex-1 rounded-[6.75px] border border-[#00000000] px-2 text-xs"
          placeholder="Enter promo code"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isApplyingDiscount || !code.trim()}
          aria-label={
            isApplyingDiscount
              ? "Applying discount code"
              : "Apply discount code"
          }
          className="relative text-xs font-medium border border-[#F1F2F9] py-1.75 px-3.5 rounded-[6.75px] bg-white h-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className={isApplyingDiscount ? "invisible" : undefined}>
            Apply
          </span>
          {isApplyingDiscount && (
            <Loader2
              className="absolute inset-0 m-auto size-3.5 animate-spin"
              aria-hidden="true"
            />
          )}
        </button>
      </form>
    </FilterSectionWrapper>
  );
};

export default PromoCode;
