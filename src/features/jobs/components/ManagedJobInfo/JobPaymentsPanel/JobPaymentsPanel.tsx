"use client";

import { useMemo, useState } from "react";
import { CircleCheck, Repeat2, Printer, Tag, ArrowDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import DataTable from "@/components/organisms/DataTable/DataTable";
import { formatBudgetAmount } from "../../../helpers/manageJobs";
import type { JobPayment } from "../../../types/jobManagement";

const paymentTone = {
  paid: "success",
  pending: "warning",
  upcoming: "neutral",
  overdue: "danger",
} as const;
const paymentLabel = {
  paid: "Paid",
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
}: {
  payments?: JobPayment[];
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
      id: "receipt",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-5 text-[#737774]">
          <Tag className="size-4" aria-label={row.original.milestone} />
          {row.original.receiptUrl ? (
            <a
              href={row.original.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open receipt ${row.original.reference}`}
            >
              <Printer className="size-4" />
            </a>
          ) : (
            <button
              disabled
              aria-label="Receipt unavailable"
              className="opacity-40"
            >
              <Printer className="size-4" />
            </button>
          )}
        </div>
      ),
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
