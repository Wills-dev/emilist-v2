"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CircleCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import Container from "@/components/atoms/Container/Container";
import Button from "@/components/atoms/Button/Button";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { verifyPaystackPayment, fetchWalletTransactions } from "../../api/fetchTransactions";
import { fetchWalletOverview } from "../../api/fetchWalletOverview";
import { useWalletTransaction } from "../../hooks/useWalletTransactions";
import { clearStoredWalletFunding, getStoredWalletFundingSnapshot, parseStoredWalletFunding, subscribeWalletFundingStorage } from "../../helpers/walletFundingStorage";
import { transactionRecord } from "../../helpers/normalizeTransactions";
import { walletKeys } from "../../queries/walletKeys";
import { transactionKeys } from "../../queries/transactionKeys";
import type { StoredWalletFunding } from "../../types/fundWallet";

const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

export default function WalletFundingReturn() {
  const searchParams = useSearchParams();
  const userId = useStore((state) => state.currentUser?._id);
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const raw = useSyncExternalStore(subscribeWalletFundingStorage, getStoredWalletFundingSnapshot, () => null);
  if (!hydrated || !userId) return <Container variant="small" className="flex min-h-[calc(100dvh-5rem)] items-center justify-center py-8"><Skeleton className="mx-auto h-48 w-full max-w-lg" /></Container>;
  const stored = parseStoredWalletFunding(raw, userId);
  const returnedReference = searchParams.get("reference") || searchParams.get("trxref");
  return <FundingReturnContent key={userId} userId={userId} initialFunding={stored} returnedReference={returnedReference} />;
}

function FundingReturnContent({ userId, initialFunding, returnedReference }: {
  userId: string;
  initialFunding: StoredWalletFunding | null;
  returnedReference: string | null;
}) {
  // Keep the completed payment context on screen after clearing session storage.
  const [stored] = useState(initialFunding);
  const router = useRouter();
  const queryClient = useQueryClient();
  const reference = stored?.reference || returnedReference || "";
  const mismatch = Boolean(stored && returnedReference && stored.reference !== returnedReference);
  const verification = useQuery({
    queryKey: transactionKeys.verification(userId, reference),
    // Do not attach an abort signal: Strict Mode remounts must share this verification.
    queryFn: () => verifyPaystackPayment(reference),
    enabled: Boolean(userId && reference && !mismatch),
    retry: false, staleTime: Infinity, refetchOnMount: false, refetchOnWindowFocus: false,
  });
  const verified = transactionRecord(verification.data);
  const transactionId = stored?.transactionId || (typeof verified._id === "string" ? verified._id : typeof verified.transactionId === "string" ? verified.transactionId : "");
  const walletId = stored?.walletId || (typeof verified.walletId === "string" ? verified.walletId : "");
  const transaction = useWalletTransaction(transactionId, verification.isSuccess && !mismatch);
  const status = transaction.data?.status;
  const refresh = useQuery({
    queryKey: [...transactionKeys.all, "funding-refresh", userId, reference, walletId, status],
    queryFn: async () => {
      await Promise.all([fetchWalletOverview(walletId ? { walletId } : {}), ...(walletId ? [fetchWalletTransactions(walletId, "NGN", 1, 20)] : [])]);
      await Promise.all([queryClient.invalidateQueries({ queryKey: walletKeys.all }), queryClient.invalidateQueries({ queryKey: [...transactionKeys.all, "list"] })]);
      return true;
    },
    enabled: Boolean(userId && verification.isSuccess && !mismatch && (!transactionId || transaction.isSuccess)),
    retry: false, staleTime: Infinity, refetchOnMount: false, refetchOnWindowFocus: false,
  });
  const successful = status === "successful";
  const failed = status === "failed";
  const checking = !mismatch && (!userId || (Boolean(reference) && verification.isPending) || (verification.isSuccess && Boolean(transactionId) && transaction.isPending));
  const error = mismatch || verification.isError || transaction.isError;
  const title = !reference ? "Payment reference unavailable" : mismatch ? "Payment reference does not match" : error ? "Unable to confirm payment" : checking ? "Checking your payment…" : successful ? "Wallet funded successfully" : failed ? "Wallet funding failed" : "Funding is awaiting confirmation";
  useEffect(() => {
    if (!mismatch && (successful || failed) && refresh.isSuccess) clearStoredWalletFunding(userId, reference);
  }, [mismatch, successful, failed, refresh.isSuccess, userId, reference]);
  const leave = () => {
    router.replace(`/dashboard/payments${walletId ? `?walletId=${encodeURIComponent(walletId)}` : ""}`);
  };
  return (
    <Container variant="small" className="flex min-h-[calc(100dvh-5rem)] items-center justify-center py-8">
      <section className="mx-auto w-full max-w-lg space-y-5 rounded-xl bg-white p-6 text-center">
        {successful && !error && !checking && (
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#EAFBF1]">
            <CircleCheck className="size-12 text-[#18A154]" aria-hidden="true" strokeWidth={1.75} />
          </div>
        )}
        <h1 className="font-exo text-xl font-semibold text-[#303632]">{title}</h1>
        {checking && <div role="status" aria-label="Checking funding payment"><Skeleton className="mx-auto h-5 w-2/3" /></div>}
        <p className="text-sm leading-6 text-[#737774]">{successful ? "Your payment is confirmed. Your wallet balance and transaction history are being refreshed." : failed ? "This funding payment was not successful. Check your transaction history before making another payment." : mismatch ? "Open the original checkout return link or check your transactions. No new funding request has been created." : error ? "We couldn’t confirm the payment yet. You can retry checking its status without starting another payment." : !reference ? "Open your wallet to check the payment in your transaction history." : "Confirmation may take a little longer. Your wallet is only credited after the payment is confirmed."}</p>
        {reference && <p className="text-xs text-[#8A8D8B] wrap-anywhere">Reference: {reference}</p>}
        {refresh.isError && <p role="alert" className="text-sm text-[#737774]">Unable to refresh your wallet data. Open Payments to retry.</p>}
        {reference && !mismatch && !checking && !successful && !failed && <Button variant="default" className="w-full" onClick={() => { if (verification.isError) void verification.refetch(); else if (transactionId) void transaction.refetch(); else void refresh.refetch(); }}>Check Again</Button>}
        <Button variant="primary" className="w-full" onClick={leave}>Back to Payments</Button>
      </section>
    </Container>
  );
}
