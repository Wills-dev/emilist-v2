"use client";

import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import ClipIcon from "@/components/atoms/icons/ClipIcon/ClipIcon";
import { Loader2 } from "lucide-react";
import { useApplyDiscountCode } from "../../hooks/useApplyDiscountCode";
import type { AppliedCartPromo } from "../../types";

const PromoCode = ({
  variant,
  appliedPromos = [],
}: {
  variant?: "primary" | "secondary" | "tertiary";
  appliedPromos?: AppliedCartPromo[];
}) => {
  const {
    code,
    handleApplyDiscount,
    handleCodeChange,
    handleRemoveDiscount,
    isApplyingDiscount,
    isRemovingDiscount,
    isCartLocked,
  } = useApplyDiscountCode();

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
          disabled={isApplyingDiscount || isCartLocked}
          className=" h-full bg-[#FDFDFD] w-full flex-1 rounded-[6.75px] border border-[#00000000] px-2 text-xs"
          placeholder="Enter promo code"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isApplyingDiscount || isCartLocked || !code.trim()}
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
      {appliedPromos.length > 0 && (
        <ul className="mt-3 space-y-2" aria-label="Applied promo codes">
          {appliedPromos.map((promo) => (
            <li
              key={promo.code}
              className="flex items-center justify-between gap-2 rounded-md bg-white px-2 py-1.5 text-xs"
            >
              <span>
                <span className="font-medium">{promo.code}</span>
                <span className="ml-1 text-[#737774]">
                  ({promo.discountPercentage}% off)
                </span>
              </span>
              <button
                type="button"
                onClick={() => handleRemoveDiscount(promo.code)}
                disabled={isRemovingDiscount || isCartLocked}
                className="text-[#FF5D7A] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={`Remove promo code ${promo.code}`}
              >
                {isRemovingDiscount ? (
                  <Loader2 className="size-3 animate-spin" aria-hidden="true" />
                ) : (
                  "Remove"
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </FilterSectionWrapper>
  );
};

export default PromoCode;
