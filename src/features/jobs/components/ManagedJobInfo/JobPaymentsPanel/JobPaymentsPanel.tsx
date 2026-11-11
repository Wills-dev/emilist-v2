"use client";

import { useMemo, useState } from "react";
import { DropdownMenu } from "radix-ui";
import { toast } from "sonner";
import { downloadInvoice } from "../../../helpers/downloadInvoice";
import { CircleCheck, Repeat2, Printer, ArrowDown, MoreVertical } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import DataTable from "@/components/organisms/DataTable/DataTable";
import { formatBudgetAmount } from "../../../helpers/manageJobs";
import type { JobInvoice, JobPayment } from "../../../types/jobManagement";

const paymentTone = {
  paid: "success",
  unpaid: "warning",
  pending: "warning",
  upcoming: "neutral",
  overdue: "danger",
} as const;
const paymentLabel = {
  paid: "Paid",
  unpaid: "Unpaid",
  pending: "Pending",
  upcoming: "Upcoming",
  overdue: "Overdue",
};
const dateLabel = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-GB", { timeZone: "UTC" });
};

function PaymentSummary({
  title,
  payments,
  upcoming = false,
}: {
  title: string;
  payments: JobPayment[];
  upcoming?: boolean;
}) {
  const totals = payments.reduce<Record<string, number>>(
    (sums, payment) => ({
      ...sums,
      [payment.currency]: (sums[payment.currency] ?? 0) + payment.amount,
    }),
    {},
  );
  const Icon = upcoming ? Repeat2 : CircleCheck;
  return (
    <article className="space-y-3 bg-white p-5">
      <div className="flex items-center justify-between">
        <Icon
          className={`size-5 rounded ${upcoming ? "bg-[#FFF6E9] text-[#FF9C2B]" : "bg-[#F0FDF5] text-[#25C269]"}`}
        />
        <span className="rounded-full bg-[#F1F2F9] px-2 py-0.5 text-xs">
          {payments.length}
        </span>
      </div>
      <h2 className="font-exo font-semibold text-[#303632]">{title}</h2>
      <p className="pt-3 font-exo text-xl font-bold text-[#4B514D]">
        {Object.entries(totals)
          .map(([currency, amount]) => formatBudgetAmount(amount, currency))
          .join(" / ") || "—"}
      </p>
    </article>
  );
}

export default function JobPaymentsPanel({
  payments: paymentData,
  invoices = [],
  canPay = false,
  onMakePayment,
}: {
  payments?: JobPayment[];
  invoices?: JobInvoice[];
  canPay?: boolean;
  onMakePayment?: (invoice: JobInvoice) => void;
}) {
  const payments = useMemo(() => paymentData ?? [], [paymentData]);
  const [page, setPage] = useState(1);
  const [descending, setDescending] = useState(false);
  const sorted = useMemo(
    () =>
      [...payments].sort(
        (a, b) =>
          (descending ? -1 : 1) *
          a.milestone.localeCompare(b.milestone, undefined, { numeric: true }),
      ),
    [payments, descending],
  );
  const columns: ColumnDef<JobPayment>[] = [
    { accessorKey: "reference", header: "Reference" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span
          className={
            row.original.status === "paid"
              ? "text-[#00B750]"
              : row.original.status === "pending"
                ? "text-[#FF9C2B]"
                : "text-[#303632]"
          }
        >
          {formatBudgetAmount(row.original.amount, row.original.currency)}
        </span>
      ),
    },
    { accessorKey: "recipient", header: "Recipient" },
    {
      accessorKey: "milestone",
      header: () => (
        <button
          type="button"
          onClick={() => setDescending(!descending)}
          aria-label={`Sort milestone ${descending ? "ascending" : "descending"}`}
          className="inline-flex items-center gap-1"
        >
          Tag{" "}
          <ArrowDown className={`size-3 ${descending ? "rotate-180" : ""}`} />
        </button>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => dateLabel(row.original.date),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          label={paymentLabel[row.original.status]}
          tone={paymentTone[row.original.status]}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const payment = row.original;
        const invoice = invoices.find((item) => item.id === payment.id);
        const payable = canPay && invoice && (payment.status === "unpaid" || payment.status === "overdue");
        const itemClassName = "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-[#4F5D75] outline-none data-[highlighted]:bg-[#F0FDF5] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40";
        return (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button type="button" aria-label={`Actions for ${payment.milestone}`} className="inline-flex size-8 items-center justify-center rounded-md hover:bg-[#EDEEF0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A154]">
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="end" sideOffset={4} className="z-50 min-w-48 rounded-lg border border-[#EDEEF0] bg-white p-1 shadow-lg">
                {payable && (
                  <DropdownMenu.Item disabled={!onMakePayment} onSelect={() => onMakePayment?.(invoice)} className={itemClassName}>
                    Make Payment
                  </DropdownMenu.Item>
                )}
                {payable && !onMakePayment && <p className="max-w-52 px-3 py-2 text-xs text-[#768592]">Invoice payments are not available yet.</p>}
                {invoice && <DropdownMenu.Item className={itemClassName} onSelect={() => { void downloadInvoice(invoice).catch(() => toast.error("Unable to download invoice. Please try again.")); }}>Download Invoice</DropdownMenu.Item>}
                {payment.receiptUrl && (
                  <DropdownMenu.Item asChild>
                    <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" className={itemClassName}><Printer className="size-4" />Open Receipt</a>
                  </DropdownMenu.Item>
                )}
                {!invoice && !payment.receiptUrl && <DropdownMenu.Item disabled className={itemClassName}>Receipt unavailable</DropdownMenu.Item>}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        );
      },
    },
  ];
  return (
    <section className="space-y-5 border border-[#ECECEC] bg-[#F9F9F9] p-3 sm:p-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <PaymentSummary
          title="Completed Payments"
          payments={payments.filter((p) => p.status === "paid")}
        />
        <PaymentSummary
          title="Upcoming Payments"
          upcoming
          payments={payments.filter((p) => p.status !== "paid")}
        />
      </div>
      {payments.length ? (
        <>
          <div className="overflow-x-auto">
            <DataTable
              data={sorted.slice((page - 1) * 10, page * 10)}
              columns={columns}
              rowClassName="odd:bg-[#F8FAFB] even:bg-white"
            />
          </div>
          <PaginationPanel
            variant="inline"
            page={page}
            totalPages={Math.ceil(payments.length / 10)}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
          />
        </>
      ) : (
        <EmptyState
          title={paymentData ? "No payments found" : "Payments unavailable"}
          description="Payments for this job will appear here when available."
        />
      )}
    </section>
  );
}
