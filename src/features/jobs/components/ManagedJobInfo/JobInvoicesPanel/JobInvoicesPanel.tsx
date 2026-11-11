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
    <article className="min-w-0 border-2 border-[#EDEEF0] bg-[#F9F9F9] text-[#303632] sm:border-[6px]">
      <div className="grid min-w-0 grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-5">
        <div className="min-w-0 space-y-4">
          <h2 className="font-medium text-[#707471]">Invoice {index + 1}</h2>
          <div className="space-y-1">
            <p className="text-xs text-[#768592]">Billed To:</p>
            <p className="font-medium wrap-anywhere">{invoice.billedTo}</p>
          </div>
        </div>
        <div className="min-w-0 space-y-4 text-left text-xs sm:text-right">
          <div>
            <p className="text-[#768592]">Invoice No.</p>
            {invoice.number && invoice.number !== "—" && (
              <p className="font-exo text-base font-bold text-[#101828] wrap-anywhere">
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
        </div>
      </div>
      <div className="mx-4 mb-4 min-w-0 rounded-lg border border-[#E2E8ED] bg-white p-3 sm:mx-5 sm:mb-5">
        <p className="mb-1 text-xs text-[#768592]">Milestone</p>
        <p className="text-sm leading-6 text-[#4F5D75] wrap-anywhere">{invoice.milestone}</p>
      </div>
      <div className="grid grid-cols-1 border-y-2 border-[#EDEEF0] text-xs sm:grid-cols-2 sm:border-y-[6px]">
        <div className="space-y-4 border-b-2 border-[#EDEEF0] p-4 sm:border-r-[6px] sm:border-b-0">
          <div className="space-y-2">
            <p className="text-[#768592]">Status</p>
            <StatusBadge
              label={invoiceDisplay.label}
              tone={invoiceDisplay.paid ? "success" : "warning"}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2">
            <div className="space-y-1">
              <p className="text-[#768592]">Issued on</p>
              <p className="font-semibold">{dateLabel(invoice.issuedAt)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#768592]">Due Date</p>
              <p className="font-semibold">{dateLabel(invoice.dueAt)}</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 space-y-3 p-4">
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
      <div className="flex flex-col items-stretch gap-3 p-3 sm:flex-row">
        <button
          type="button"
          onClick={() => void handleDownload()}
          disabled={downloading}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#DCE3DE] bg-white px-4 py-2.5 text-sm hover:bg-[#F0FDF5] disabled:opacity-50"
        >
          <ReceiptText className="size-4 shrink-0" />
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
            <CreditCard className="size-4 shrink-0" />
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
      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
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
