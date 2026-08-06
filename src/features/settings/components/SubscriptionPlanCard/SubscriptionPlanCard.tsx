"use client";

import { Check, Star } from "lucide-react";
import { toast } from "sonner";

import Button from "@/components/atoms/Button/Button";
import { SubscriptionPlan } from "../../types/subscription";

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  billingCycle?: "monthly" | "yearly";
  summary?: boolean;
  viewPlan?: () => void;
}

const formatPrice = (price: number) =>
  price ? `₦${price.toLocaleString()}` : "Free";

const SubscriptionPlanCard = ({
  plan,
  billingCycle = "monthly",
  summary = false,
  viewPlan,
}: SubscriptionPlanCardProps) => {
  const price =
    billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

  const showConsole = () => {
    if (viewPlan === undefined) return;
    viewPlan();
  };

  if (summary) {
    return (
      <article className="w-72.5 min-w-72.5 max-w-72.5 shrink-0 basis-72.5 rounded-lg bg-[#F4F7F5] p-2 sm:w-115 sm:min-w-115 sm:max-w-115 sm:basis-115">
        <div className="rounded-lg bg-white p-4">
          <div className="flex sm:items-center max-sm:flex-col justify-between gap-4 border-b border-[#ECECEC] pb-5">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-white shadow-md">
                <Star className="size-5" fill={plan.color} color={plan.color} />
              </span>
              <div>
                <p className="text-xs text-[#737774]">Current Plan</p>
                <p className="font-exo font-semibold">{plan.name} Plan</p>
              </div>
              {plan.status && (
                <span
                  className={`rounded-full px-2 py-1 text-xs ${plan.status === "active" ? "bg-[#EAFBF1] text-[#07883E]" : "bg-[#F7F7F7] text-[#B1B3B1]"}`}
                >
                  {plan.status === "active" ? "Active" : "Inactive"}
                </span>
              )}
            </div>
            {plan.billingProgress && (
              <span className="rounded-full bg-[#F5F6FA] px-3 py-1 text-xs w-fit">
                {plan.billingProgress}
              </span>
            )}
          </div>
          <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 pt-4 sm:flex-nowrap">
            <p className="font-exo sm:text-2xl text-lg font-bold">
              {formatPrice(plan.monthlyPrice)}
              <span className="text-xs font-normal text-[#737774]">/month</span>
            </p>
            <div className="flex gap-2">
              {plan.status === "active" && (
                <button
                  type="button"
                  onClick={showConsole}
                  className="flex h-8 items-center justify-center whitespace-nowrap rounded-lg border border-[#25C269] bg-[#FBFFF8] px-3 py-2 font-exo text-xs font-semibold text-[#25C269] transition-colors hover:bg-green-100"
                >
                  View all Plans
                </button>
              )}
              <Button
                variant="primary"
                className="h-8 px-3! py-2 text-xs"
                onClick={() =>
                  toast.info(
                    "Subscription checkout will be connected when its endpoint is available.",
                  )
                }
              >
                {plan.status === "active" ? "Renew Plan" : "Activate"}
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex min-h-130 flex-col rounded-lg border border-[#DFE2E0] bg-white">
      <div className="border-b border-[#ECECEC] p-6">
        <h3 className="font-exo text-lg font-semibold">{plan.name}</h3>
        <p className="mt-4 min-h-10 text-sm text-[#474C48]">
          Everything you need to grow your business.
        </p>
        <p className="mt-5 font-exo text-3xl font-bold">
          {formatPrice(price)}
          <span className="text-sm font-normal text-[#737774]">
            /{billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </p>
        {price > 0 && (
          <Button
            variant="primary"
            className="mt-5 h-10 w-full py-2"
            onClick={() =>
              toast.info(
                "Subscription checkout will be connected when its endpoint is available.",
              )
            }
          >
            Choose {plan.name}
          </Button>
        )}
      </div>
      <div className="p-6">
        <p className="mb-5 text-xs font-semibold uppercase">What’s included</p>
        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm text-[#737774]">
              <Check className="mt-0.5 size-4 shrink-0 text-[#12B981]" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default SubscriptionPlanCard;
