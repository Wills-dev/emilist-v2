"use client";

import { MoreVertical, Printer } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import { formatBudgetAmount } from "@/features/jobs/helpers/manageJobs";
import { Transaction } from "../../types";
import { printTransactionReceipt } from "../../helpers/printTransactionReceipt";

const statusStyles = {
  successful: "bg-[#EAFBF1] text-[#07883E]",
  pending: "bg-[#FFF6E8] text-[#FF8A00]",
  processing: "bg-[#FFF6E8] text-[#FF8A00]",
  unknown: "bg-[#F1F2F9] text-[#737774]",
  failed: "bg-[#FFF0F3] text-[#FF5D7A]",
};

const serviceLabels: Record<string, string> = {
  walletfunding: "Wallet Funding",
  job: "Job",
  withdrawal: "Withdrawal",
  subscription: "Subscription",
  order: "Order",
};
const identifier = (value?: string) => value ? <IdentifierBadge label="ID" value={value} maxWidth="max-w-40" /> : "—";

export const transactionColumns = (onStatus?: (id: string) => void): ColumnDef<Transaction>[] => [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "id", header: "Transaction ID", cell: ({ row }) => <span title={row.original.id}>{row.original.shortTransactionId || row.original.id}</span> },
  { accessorKey: "reference", header: "Reference", cell: ({ row }) => <span className="whitespace-nowrap">{row.original.reference || "—"}</span> },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className={row.original.type === "inflow" ? "text-[#18A154]" : "text-[#FF5D7A]"}>
        {row.original.type === "inflow" ? "↗" : row.original.type === "outflow" ? "↘" : ""} {row.original.formattedAmount || formatBudgetAmount(row.original.amount, row.original.currency ?? "NGN")}
      </span>
    ),
  },
  { accessorKey: "currency", header: "Currency", cell: ({ row }) => row.original.currency || "—" },
  { accessorKey: "counterparty", header: "Counterparty" },
  { accessorKey: "paymentMethod", header: "Payment Method", cell: ({ row }) => row.original.paymentMethod === "BankTransfer" ? "Bank Transfer" : row.original.paymentMethod || "—" },
  { accessorKey: "paymentService", header: "Payment Service", cell: ({ row }) => row.original.paymentService || "—" },
  { accessorKey: "serviceType", header: "Service Type", cell: ({ row }) => serviceLabels[row.original.serviceType?.toLowerCase() ?? ""] || row.original.serviceType || "—" },
  { accessorKey: "jobId", header: "Job ID", cell: ({ row }) => identifier(row.original.jobId) },
  { accessorKey: "milestoneId", header: "Milestone ID", cell: ({ row }) => identifier(row.original.milestoneId) },
  { accessorKey: "orderId", header: "Order ID", cell: ({ row }) => identifier(row.original.orderId) },
  { accessorKey: "balance", header: "Balance", cell: ({ row }) => row.original.balance === undefined ? "—" : formatBudgetAmount(row.original.balance, row.original.currency ?? "NGN") },
  { accessorKey: "type", header: "Transaction Type", cell: ({ row }) => <span className="capitalize text-[#667085]">{row.original.type}</span> },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className={`rounded-full px-2 py-1 text-[10px] capitalize ${statusStyles[row.original.status]}`}>{row.original.status}</span>,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-5 text-[#737774]">
        <button type="button" aria-label={`Print transaction ${row.original.id}`} disabled={row.original.status !== "successful"} className="disabled:opacity-30" onClick={() => printTransactionReceipt(row.original)}><Printer className="size-4" /></button>
        <button type="button" aria-label={`Check status of transaction ${row.original.id}`} onClick={() => onStatus?.(row.original.id)}><MoreVertical className="size-4" /></button>
      </div>
    ),
  },
];
