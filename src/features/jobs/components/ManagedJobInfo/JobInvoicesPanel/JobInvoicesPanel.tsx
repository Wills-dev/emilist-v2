"use client";

import { useState } from "react";
import { toast } from "sonner";
import { downloadInvoice } from "../../../helpers/downloadInvoice";
import { ReceiptText, CreditCard } from "lucide-react";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { getInvoiceDisplay } from "../../../helpers/invoiceDisplay";
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
  canPay = false,
  onMakePayment,
}: {
  invoice: JobInvoice;
  index: number;
  canPay?: boolean;
  onMakePayment?: (invoice: JobInvoice) => void;
}) {
  const invoiceDisplay = getInvoiceDisplay(invoice);
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadInvoice(invoice);
    } catch {
      toast.error("Unable to download invoice. Please try again.");
    } finally {
      setDownloading(false);
    }
  };
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
            {invoice.number && invoice.number !== "—" && (
              <p className="font-exo text-base font-bold text-[#101828]">
                {invoice.number}
              </p>
            )}
            {invoice.invoiceId ? (
              <IdentifierBadge
                label="Invoice ID"
                value={invoice.invoiceId}
                maxWidth="max-w-40 sm:max-w-48"
              />
            ) : (
              (!invoice.number || invoice.number === "—") && <p>—</p>
            )}
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
              label={invoiceDisplay.label}
              tone={invoiceDisplay.paid ? "success" : "warning"}
            />
          </div>
          <div className="space-y-2 text-right">
            <p>{invoiceDisplay.paid ? "Date" : "Due Date"}</p>
            <p className="font-semibold">
              {dateLabel(invoiceDisplay.date)}
            </p>
          </div>
        </div>
        <div className="space-y-3 p-3 sm:p-4">
          <div className="flex flex-wrap justify-between gap-1">
            <span className="text-[#768592]">Subtotal</span>
            <span>{formatBudgetAmount(invoice.subtotal ?? invoice.amount, invoice.currency)}</span>
          </div>
          {invoice.additionalAmount !== undefined && <div className="flex flex-wrap justify-between gap-1"><span className="text-[#768592]">Additional costs</span><span>{formatBudgetAmount(invoice.additionalAmount, invoice.currency)}</span></div>}
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
      {invoice.note && <div className="border-b-[6px] border-[#EDEEF0] p-4 text-sm"><p className="mb-2 text-xs text-[#768592]">Reason for additional costs</p><p className="whitespace-pre-wrap wrap-anywhere">{invoice.note}</p></div>}
      <div className="flex flex-wrap items-center justify-center gap-3 p-3">
        <button
          type="button"
          onClick={() => void handleDownload()}
          disabled={downloading}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#DCE3DE] bg-white px-4 py-2.5 text-sm hover:bg-[#F0FDF5] disabled:opacity-50"
        >
          <ReceiptText className="size-4" />
          {downloading ? "Preparing PDF…" : "Download Invoice"}
        </button>
        {canPay && !invoiceDisplay.paid && invoice.status !== "pending" && (
          <button
            type="button"
            disabled={!onMakePayment}
            onClick={() => onMakePayment?.(invoice)}
            title={!onMakePayment ? "Invoice payments are not available yet" : undefined}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#18A154] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#125C32] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CreditCard className="size-4" />
            Make Payment
          </button>
        )}
      </div>
      {canPay && !invoiceDisplay.paid && invoice.status !== "pending" && !onMakePayment && (
        <p className="px-4 pb-3 text-center text-xs text-[#768592]">Invoice payments are not available yet.</p>
      )}
    </article>
  );
}

export default function JobInvoicesPanel({
  invoices,
  canPay = false,
  onMakePayment,
}: {
  invoices?: JobInvoice[];
  canPay?: boolean;
  onMakePayment?: (invoice: JobInvoice) => void;
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
            canPay={canPay}
            onMakePayment={onMakePayment}
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
