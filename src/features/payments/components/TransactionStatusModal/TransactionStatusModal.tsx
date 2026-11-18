"use client";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useTransactionDetails } from "../../hooks/useTransactionDetails";
import { transactionDetailRows } from "../../helpers/transactionDetailRows";

export default function TransactionStatusModal({ transactionId, onClose }: { transactionId: string; onClose: () => void }) {
  const { query, changeOpen, refresh } = useTransactionDetails(transactionId, onClose);
  return <ModalWrapper open title="Transaction Details" onClose={changeOpen} className="sm:max-w-xl">
    <div className="space-y-5 pt-4 text-sm text-[#737774]">
      {query.isPending ? <div role="status" aria-label="Loading transaction details" className="space-y-4"><Skeleton className="h-7 w-24" />{Array.from({ length: 8 }, (_, row) => <div key={row} className="flex justify-between gap-4"><Skeleton className="h-4 w-28" /><Skeleton className="h-4 w-40" /></div>)}</div> : query.isError ? <p role="alert">Unable to fetch this transaction. Please try again.</p> : query.data ? <>
        <StatusBadge label={query.data.status} tone={query.data.status === "successful" ? "success" : query.data.status === "failed" ? "danger" : "warning"} />
        <dl className="divide-y divide-[#ECECEC]">{transactionDetailRows(query.data).map((row) => <div key={row.label} className="flex flex-wrap items-start justify-between gap-2 py-3"><dt>{row.label}</dt><dd className="max-w-full break-words text-right text-[#303632]">{row.identifier ? <IdentifierBadge label={row.label} value={row.value!} /> : row.value}</dd></div>)}</dl>
      </> : null}
      <Button variant="default" className="h-11 w-full" disabled={query.isFetching} onClick={refresh}>Refresh Details</Button>
    </div>
  </ModalWrapper>;
}
