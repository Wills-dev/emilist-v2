"use client";

import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useCurrentSubscription } from "@/features/subscriptions/hooks/useUserSubscriptions";
import { useSubscriptionPlans } from "@/features/subscriptions/hooks/useSubscriptionPlans";
import SubscriptionPlanCard from "../SubscriptionPlanCard/SubscriptionPlanCard";

export default function SubscriptionPlansContent({ summary = false, billingCycle = "monthly", enabled = true, onViewPlan }: {
  summary?: boolean;
  billingCycle?: "monthly" | "yearly";
  enabled?: boolean;
  onViewPlan?: () => void;
}) {
  const query = useSubscriptionPlans(billingCycle, enabled);
  const current = useCurrentSubscription(enabled);
  const layout = summary ? "flex w-full min-w-0 max-w-full gap-3 overflow-x-auto overscroll-x-contain pb-2 no-scrollbar" : "grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-4";
  if (query.isPending) return (
    <div role="status" aria-label="Loading subscription plans" className={layout}>
      {Array.from({ length: summary ? 3 : 4 }, (_, index) => (
        <div key={index} aria-hidden="true" className={`space-y-4 rounded-lg border border-[#DFE2E0] bg-white p-6 ${summary ? "w-72.5 shrink-0 sm:w-115" : "min-h-96"}`}>
          <Skeleton className="h-5 w-24" /><Skeleton className="h-8 w-36" /><Skeleton className="h-10 w-full" />
          {!summary && <><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-5/6" /></>}
        </div>
      ))}
    </div>
  );
  if (query.isError) return <div role="alert" className="space-y-3 p-5 text-sm text-[#737774]"><p>Unable to load subscription plans.</p><button type="button" onClick={() => void query.refetch()} className="text-[#18A154] underline">Retry</button></div>;
  if (!query.data?.length) return <p className="p-5 text-center text-sm text-[#737774]">No subscription plans are available yet.</p>;
  return <div className={layout}>{query.data.map((plan) => <SubscriptionPlanCard key={plan.id} plan={plan} isCurrent={current.data?.planId === plan.id && current.data?.status.toLowerCase() === "active"} summary={summary} billingCycle={billingCycle} viewPlan={onViewPlan} />)}</div>;
}
