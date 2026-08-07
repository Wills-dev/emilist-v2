"use client";

import { MoreVertical, Printer } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Transaction } from "../../types";
import { printTransactionReceipt } from "../../helpers/printTransactionReceipt";

const statusStyles = {
  successful: "bg-[#EAFBF1] text-[#07883E]",
  pending: "bg-[#FFF6E8] text-[#FF8A00]",
  failed: "bg-[#FFF0F3] text-[#FF5D7A]",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "id", header: "Transaction ID" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className={row.original.type === "inflow" ? "text-[#18A154]" : "text-[#FF5D7A]"}>
        {row.original.type === "inflow" ? "↗" : "↘"} ₦ {row.original.amount.toLocaleString()}
      </span>
    ),
  },
  { accessorKey: "counterparty", header: "Counterparty" },
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
        <button type="button" aria-label={`Print transaction ${row.original.id}`} onClick={() => printTransactionReceipt(row.original)}><Printer className="size-4" /></button>
        <button type="button" aria-label={`More actions for ${row.original.id}`}><MoreVertical className="size-4" /></button>
      </div>
    ),
  },
];
