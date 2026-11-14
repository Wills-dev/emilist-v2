"use client";

import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { useCurrentSubscription, useSubscriptionHistory } from "@/features/subscriptions/hooks/useUserSubscriptions";
import { useSubscriptionPlans } from "@/features/subscriptions/hooks/useSubscriptionPlans";
import type { SubscriptionHistoryItem } from "../../types/subscription";
import SubscriptionHistoryTable from "../SubscriptionHistoryTable/SubscriptionHistoryTable";
import SubscriptionPlansContent from "../SubscriptionPlansContent/SubscriptionPlansContent";
import SubscriptionPlansModal from "../SubscriptionPlansModal/SubscriptionPlansModal";

const dateLabel = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-GB", { timeZone: "UTC" });
};
const statusLabel = (value: string) => value ? value.charAt(0).toUpperCase() + value.slice(1).replaceAll("_", " ") : "Unknown";

const SubscriptionsTab = () => {
  const [plansOpen, setPlansOpen] = useState(false);
  const current = useCurrentSubscription();
  const history = useSubscriptionHistory();
  const plans = useSubscriptionPlans();
  const currentName = current.data?.planName || plans.data?.find((plan) => plan.id === current.data?.planId)?.name || "Subscription";
  const historyRows = useMemo((): SubscriptionHistoryItem[] => (history.data ?? []).map((item) => {
    const paymentStatus = item.paymentStatus.toLowerCase();
    const status = ["paid", "successful", "success"].includes(paymentStatus) ? "Paid" : statusLabel(item.paymentStatus || item.status);
    return {
      id: item.id,
      issueDate: dateLabel(item.createdAt || item.startedAt),
      amount: item.amount,
      currency: item.currency,
      description: item.planName || plans.data?.find((plan) => plan.id === item.planId)?.name || "Subscription",
      receipt: item.reference,
      status,
      datePaid: dateLabel(item.paidAt),
    };
  }), [history.data, plans.data]);

  return (
    <section className="min-w-0 max-w-full space-y-4">
      <div className="space-y-3 rounded-lg bg-white p-4">
        <h2 className="font-exo font-semibold text-[#303632]">Current subscription</h2>
        {current.isPending ? <div role="status" aria-label="Loading current subscription"><Skeleton className="h-20 w-full" /></div> : current.isError ? (
          <div role="alert" className="text-sm text-[#737774]"><p>Unable to load your current subscription.</p><button type="button" onClick={() => void current.refetch()} className="mt-2 text-[#18A154] underline">Retry</button></div>
        ) : !current.data ? <p className="text-sm text-[#737774]">You don’t have a current subscription.</p> : <>
          <div className="flex flex-wrap items-center gap-3"><p className="font-exo text-lg font-semibold">{currentName}</p><StatusBadge label={statusLabel(current.data.status)} tone={current.data.status.toLowerCase() === "active" ? "success" : "neutral"} /></div>
          <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#737774]"><div><dt>Started</dt><dd className="mt-1 text-[#303632]">{dateLabel(current.data.startedAt)}</dd></div><div><dt>Expires</dt><dd className="mt-1 text-[#303632]">{dateLabel(current.data.expiresAt)}</dd></div></dl>
        </>}
      </div>
      <div className="min-w-0 bg-white p-2"><SubscriptionPlansContent summary onViewPlan={() => setPlansOpen(true)} /></div>
      <div className="space-y-3 bg-white p-4">
        <h2 className="font-exo font-semibold text-[#303632]">Subscription history</h2>
        {history.isPending ? <div role="status" aria-label="Loading subscription history"><Skeleton className="h-40 w-full" /></div> : history.isError ? <div role="alert" className="text-sm text-[#737774]"><p>Unable to load subscription history.</p><button type="button" onClick={() => void history.refetch()} className="mt-2 text-[#18A154] underline">Retry</button></div> : historyRows.length ? <SubscriptionHistoryTable data={historyRows} /> : <p className="py-5 text-center text-sm text-[#737774]">No subscription history yet.</p>}
      </div>
      {plansOpen && <SubscriptionPlansModal open={plansOpen} onClose={setPlansOpen} />}
    </section>
  );
};

export default SubscriptionsTab;
