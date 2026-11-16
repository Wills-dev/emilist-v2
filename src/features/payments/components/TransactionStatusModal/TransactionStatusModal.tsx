"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { useWalletTransaction } from "../../hooks/useWalletTransactions";

export default function TransactionStatusModal({ transactionId, onClose }: { transactionId: string; onClose: () => void }) {
  const query = useWalletTransaction(transactionId);
  const status = query.data?.status;
  return <ModalWrapper open title="Transaction status" onClose={(open) => { if (!open) onClose(); }} className="max-w-md!">
    <div className="space-y-4 pt-4 text-sm text-[#737774]">
      <p className="text-xs wrap-anywhere">{transactionId}</p>
      {query.isPending ? <p role="status">Checking transaction…</p> : query.isError ? <p role="alert">Unable to fetch this transaction.</p> : <><p className="font-medium capitalize text-[#303632]">{status}</p><p>{status === "successful" ? "This transaction has been confirmed." : status === "failed" ? "This transaction failed or was declined." : status === "processing" ? "This transaction is being processed." : status === "pending" ? "Awaiting payment confirmation or administrator approval." : "The transaction status is unavailable."}</p></>}
      <Button variant="default" className="w-full" disabled={query.isFetching} onClick={() => void query.refetch()}>Refresh Status</Button>
    </div>
  </ModalWrapper>;
}
