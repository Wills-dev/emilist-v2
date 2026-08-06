"use client";

import { useState } from "react";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { subscriptionPlans } from "../../constants/subscriptions";
import SubscriptionPlanCard from "../SubscriptionPlanCard/SubscriptionPlanCard";

interface SubscriptionPlansModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
}

const SubscriptionPlansModal = ({
  open,
  onClose,
}: SubscriptionPlansModalProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Subscription Plans"
      description="Start building for free, then add a plan to unlock pro access and additional features."
      className="max-w-6xl!"
      titleClassName="text-center"
      descClassName="text-center text-[#474C48]"
      headerClassName="pt-4"
    >
      <div className="mx-auto my-6 grid max-w-72 grid-cols-2 rounded-lg bg-[#F5F5F7] p-1">
        {(["monthly", "yearly"] as const).map((cycle) => (
          <button
            key={cycle}
            type="button"
            onClick={() => setBillingCycle(cycle)}
            className={`rounded-md px-4 py-2 capitalize transition-colors ${billingCycle === cycle ? "bg-white shadow-sm" : "text-[#667085]"}`}
          >
            {cycle}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {subscriptionPlans.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
          />
        ))}
      </div>
    </ModalWrapper>
  );
};

export default SubscriptionPlansModal;
