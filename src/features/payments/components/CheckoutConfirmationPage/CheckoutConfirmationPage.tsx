"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CircleCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import Button from "@/components/atoms/Button/Button";
import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { jobKeys } from "@/features/jobs/queries/jobKeys";
import { subscriptionKeys } from "@/features/subscriptions/queries/subscriptionKeys";
import { verifyPaystackPayment } from "../../api/fetchTransactions";
import { normalizeTransactionStatus, transactionRecord } from "../../helpers/normalizeTransactions";
import { clearCheckoutConfirmation, getCheckoutSnapshot, parseCheckoutConfirmation, subscribeCheckoutConfirmation, type CheckoutConfirmation, type CheckoutKind } from "../../helpers/checkoutConfirmation";
import { useWalletTransaction } from "../../hooks/useWalletTransactions";
import { transactionKeys } from "../../queries/transactionKeys";
import { walletKeys } from "../../queries/walletKeys";

const subscribeHydration = () => () => {};
const hydratedClient = () => true;
const hydratedServer = () => false;

export default function CheckoutConfirmationPage({ kind }: { kind: CheckoutKind }) {
  const searchParams = useSearchParams();
  const userId = useStore((state) => state.currentUser?._id);
  const hydrated = useSyncExternalStore(subscribeHydration, hydratedClient, hydratedServer);
  const raw = useSyncExternalStore(subscribeCheckoutConfirmation, () => getCheckoutSnapshot(kind), () => null);
  if (!hydrated || !userId) return <Container variant="small" className="flex min-h-[calc(100dvh-5rem)] items-center justify-center py-8"><Skeleton className="h-48 w-full max-w-lg" /></Container>;
  const returnedReference = searchParams.get("reference") || searchParams.get("trxref");
  const jobId = searchParams.get("jobId");
  return <ConfirmationContent key={`${kind}:${userId}`} kind={kind} userId={userId} initialContext={parseCheckoutConfirmation(raw, kind, userId)} returnedReference={returnedReference} fallbackPath={kind === "subscription" ? "/dashboard/settings?tab=subscriptions" : jobId ? `/dashboard/jobs/${encodeURIComponent(jobId)}?section=payments` : "/dashboard/jobs"} />;
}

function ConfirmationContent({ kind, userId, initialContext, returnedReference, fallbackPath }: {
  kind: CheckoutKind;
  userId: string;
  initialContext: CheckoutConfirmation | null;
  returnedReference: string | null;
  fallbackPath: string;
}) {
  const [context] = useState(initialContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const reference = context?.reference || returnedReference || "";
  const mismatch = Boolean(context?.reference && returnedReference && context.reference !== returnedReference);
  const verification = useQuery({
    queryKey: transactionKeys.verification(userId, reference),
    queryFn: () => verifyPaystackPayment(reference),
    enabled: Boolean(reference && !mismatch),
    retry: false, staleTime: Infinity, refetchOnMount: false, refetchOnWindowFocus: false,
  });
  const verified = transactionRecord(verification.data);
  const transactionId = context?.transactionId || (typeof verified._id === "string" ? verified._id : typeof verified.transactionId === "string" ? verified.transactionId : "");
  const transaction = useWalletTransaction(transactionId, verification.isSuccess && !mismatch);
  const status = transaction.data?.status ?? (verification.isSuccess ? normalizeTransactionStatus(verified.status) : "unknown");
  const successful = status === "successful";
  const failed = status === "failed";
  const checking = !mismatch && Boolean(reference) && (verification.isPending || (verification.isSuccess && Boolean(transactionId) && transaction.isPending));
  const error = mismatch || verification.isError || transaction.isError;
  const refresh = useQuery({
    queryKey: [...transactionKeys.all, "checkout-refresh", kind, userId, reference, status],
    queryFn: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: kind === "job" ? jobKeys.all : subscriptionKeys.all }),
        queryClient.invalidateQueries({ queryKey: walletKeys.all }),
        queryClient.invalidateQueries({ queryKey: [...transactionKeys.all, "list"] }),
      ]);
      return true;
    },
    enabled: !mismatch && verification.isSuccess && (!transactionId || transaction.isSuccess),
    retry: false, staleTime: Infinity, refetchOnMount: false, refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!error && (successful || failed) && refresh.isSuccess && context) clearCheckoutConfirmation(context);
  }, [error, successful, failed, refresh.isSuccess, context]);
  const title = !reference ? "Payment reference unavailable" : mismatch ? "Payment reference does not match" : error ? "Unable to confirm payment" : checking ? "Checking your payment…" : successful ? kind === "job" ? "Job payment successful" : "Subscription payment successful" : failed ? "Payment failed" : "Payment is awaiting confirmation";
  const backLabel = kind === "job" ? "Back to Job" : "Back to Subscriptions";
  return (
    <Container variant="small" className="flex min-h-[calc(100dvh-5rem)] items-center justify-center py-8">
      <section className="mx-auto w-full max-w-lg space-y-5 rounded-xl bg-white p-6 text-center">
        {successful && !error && !checking && <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#EAFBF1]"><CircleCheck className="size-12 text-[#18A154]" aria-hidden="true" strokeWidth={1.75} /></div>}
        <h1 className="font-exo text-xl font-semibold text-[#303632]">{title}</h1>
        {checking && <div role="status" aria-label="Checking payment"><Skeleton className="mx-auto h-5 w-2/3" /></div>}
        <p className="text-sm leading-6 text-[#737774]">{error ? "We couldn’t confirm this payment. Check its status before starting another payment." : !reference ? "Return to your dashboard to review the payment status." : successful ? kind === "job" ? "Your payment has been confirmed. Your job invoices and payment details will refresh when you return." : "Your payment has been confirmed. Your current subscription and history will refresh when you return." : failed ? "This payment was not successful. Review your payment history before trying again." : "Confirmation may take a little longer. You can check again without making another payment."}</p>
        {reference && <p className="text-xs text-[#8A8D8B] wrap-anywhere">Reference: {reference}</p>}
        {refresh.isError && <p role="alert" className="text-sm text-[#737774]">Unable to refresh your details. Return to the dashboard to retry.</p>}
        {reference && !mismatch && !checking && !successful && !failed && <Button variant="default" className="w-full" onClick={() => { if (verification.isError) void verification.refetch(); else if (transactionId) void transaction.refetch(); else void verification.refetch(); }}>Check Again</Button>}
        <Button variant="primary" className="w-full" onClick={() => router.replace(context?.returnPath || fallbackPath)}>{backLabel}</Button>
      </section>
    </Container>
  );
}
