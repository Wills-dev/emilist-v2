"use client";

import { useState } from "react";

import {
  subscriptionHistory,
  subscriptionSummaryPlans,
} from "../../constants/subscriptions";
import SubscriptionHistoryTable from "../SubscriptionHistoryTable/SubscriptionHistoryTable";
import SubscriptionPlanCard from "../SubscriptionPlanCard/SubscriptionPlanCard";
import SubscriptionPlansModal from "../SubscriptionPlansModal/SubscriptionPlansModal";

const SubscriptionsTab = () => {
  const [plansOpen, setPlansOpen] = useState(false);

  return (
    <section className="space-y-4">
      <div className="overflow-hidden bg-white p-2">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {subscriptionSummaryPlans.map((plan) => (
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              summary
              viewPlan={() => setPlansOpen(true)}
            />
          ))}
        </div>
      </div>
      <SubscriptionHistoryTable data={subscriptionHistory} />
      {plansOpen && (
        <SubscriptionPlansModal open={plansOpen} onClose={setPlansOpen} />
      )}
    </section>
  );
};

export default SubscriptionsTab;
