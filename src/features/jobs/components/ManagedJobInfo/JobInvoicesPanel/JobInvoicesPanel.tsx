"use client";

import { useState } from "react";
import { ReceiptText } from "lucide-react";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { formatBudgetAmount } from "../../../helpers/manageJobs";
import type { JobInvoice } from "../../../types/jobManagement";

const dateLabel = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
};

export function JobInvoiceCard({
  invoice,
  index,
}: {
  invoice: JobInvoice;
  index: number;
}) {
  return (
    <article className="border-[6px] border-[#EDEEF0] bg-[#F9F9F9] text-[#303632]">
      <div className="flex justify-between gap-3 p-4 sm:p-5">
        <div className="space-y-5">
          <h2 className="font-medium text-[#707471]">Invoice {index + 1}</h2>
          <div className="space-y-1">
            <p className="text-xs text-[#768592]">Billed To:</p>
            <p className="font-medium">{invoice.billedTo}</p>
            <p className="text-sm text-[#6667FF]">{invoice.milestone}</p>
          </div>
        </div>
        <div className="space-y-5 text-right text-xs">
          <div>
            <p className="text-[#768592]">Invoice No.</p>
            <p className="font-exo text-base font-bold text-[#101828]">
              {invoice.number}
            </p>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-[#768592]">Issued on</p>
              <p>{dateLabel(invoice.issuedAt)}</p>
            </div>
            <div>
              <p className="text-[#768592]">Payment Due</p>
              <p>{dateLabel(invoice.dueAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-y-[6px] border-[#EDEEF0] text-[10px] sm:text-xs">
        <div className="flex items-end justify-between gap-2 border-r-[6px] border-[#EDEEF0] p-3 sm:p-4">
          <div className="space-y-2">
            <p className="text-[#768592]">Status</p>
            <StatusBadge
              label={invoice.paidAt ? "Paid" : "Unpaid"}
              tone={invoice.paidAt ? "success" : "warning"}
            />
          </div>
          <div className="space-y-2 text-right">
            <p>{invoice.paidAt ? "Date" : "Due Date"}</p>
            <p className="font-semibold">
              {dateLabel(invoice.paidAt ?? invoice.dueAt)}
            </p>
          </div>
        </div>
        <div className="space-y-3 p-3 sm:p-4">
          <div className="flex flex-wrap justify-between gap-1">
            <span className="text-[#768592]">Subtotal</span>
            <span>{formatBudgetAmount(invoice.amount, invoice.currency)}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-[#768592]">Total ({invoice.currency})</span>
            <strong className="font-exo text-sm text-[#101828] sm:text-base">
              {invoice.amount.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </strong>
          </div>
        </div>
      </div>
      {invoice.downloadUrl ? (
        <a
          href={invoice.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 text-sm hover:bg-white"
        >
          <ReceiptText className="size-4" />
          Download Invoice
        </a>
      ) : (
        <button
          disabled
          className="flex w-full items-center justify-center gap-2 py-3 text-sm disabled:opacity-40"
        >
          <ReceiptText className="size-4" />
          Download Invoice
        </button>
      )}
    </article>
  );
}

export default function JobInvoicesPanel({
  invoices,
}: {
  invoices?: JobInvoice[];
}) {
  const [page, setPage] = useState(1);
  if (!invoices)
    return (
      <EmptyState
        title="Invoices unavailable"
        description="Invoices for this job are not available yet."
        className="min-h-96"
      />
    );
  if (!invoices.length)
    return (
      <EmptyState
        title="No invoices found"
        description="Invoices will appear here when they are available."
        className="min-h-96"
      />
    );
  return (
    <section className="space-y-6 border border-[#ECECEC] bg-[#F9F9F9] p-3 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-2">
        {invoices.slice((page - 1) * 6, page * 6).map((invoice, index) => (
          <JobInvoiceCard
            key={invoice.id}
            invoice={invoice}
            index={(page - 1) * 6 + index}
          />
        ))}
      </div>
      <PaginationPanel
        variant="inline"
        page={page}
        totalPages={Math.ceil(invoices.length / 6)}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />
    </section>
  );
}
