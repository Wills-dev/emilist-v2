"use client";

import { ArrowDown, FileText, Printer } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { SubscriptionHistoryItem } from "../../types/subscription";
import { printSubscriptionReceipt } from "../../helpers/printSubscriptionReceipt";

export const subscriptionHistoryColumns: ColumnDef<SubscriptionHistoryItem>[] = [
  { accessorKey: "issueDate", header: "Issue Date" },
  { accessorKey: "amount", header: "Amount", cell: ({ row }) => `₦ ${row.original.amount.toLocaleString()}` },
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "receipt",
    header: () => <span className="flex items-center gap-2">Receipt <ArrowDown className="size-4" /></span>,
    cell: ({ row }) => <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[#737774]"><FileText className="size-4 text-[#FF5D7A]" />{row.original.receipt}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="rounded-full bg-[#EAFBF1] px-2 py-1 text-xs text-[#07883E]">{row.original.status}</span>,
  },
  { accessorKey: "datePaid", header: "Date Paid" },
  {
    id: "print",
    header: "",
    cell: ({ row }) => <button type="button" aria-label={`Print receipt ${row.original.id}`} onClick={() => printSubscriptionReceipt(row.original)} className="text-[#737774] transition-colors hover:text-[#25C269]"><Printer className="size-5" /></button>,
  },
];
