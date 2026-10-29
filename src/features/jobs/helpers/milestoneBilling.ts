import type { JobDetailsDto } from "../types/jobDetails";
import type { JobInvoice, JobPayment } from "../types/jobManagement";

const toAmount = (value: number | string | undefined) => {
  const amount = Number(String(value ?? 0).replaceAll(",", ""));
  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
};

export const getMilestoneInvoiceAmounts = (amount: number | string | undefined, additionalAmount: number | string | undefined) => {
  const subtotal = toAmount(amount);
  const additional = toAmount(additionalAmount);
  return { subtotal, additionalAmount: additional, total: (Math.round(subtotal * 100) + Math.round(additional * 100)) / 100 };
};

export const mapMilestoneBilling = (job: JobDetailsDto, ownerName: string, currency: string) => {
  const invoices: JobInvoice[] = [];
  const payments: JobPayment[] = [];
  (job.milestones ?? []).forEach((milestone, index) => {
    const invoice = milestone.invoice;
    const id = milestone._id ?? milestone.id;
    if (!invoice?.invoiceRaised || !id) return;
    const amounts = getMilestoneInvoiceAmounts(milestone.amount, invoice.additionalAmount);
    const statusText = milestone.paymentStatus?.trim().toLowerCase();
    const status = statusText === "paid" || statusText === "pending" || statusText === "overdue" ? statusText : "unpaid";
    const milestoneLabel = `Milestone ${index + 1}: ${milestone.achievement || milestone.title || ""}`.trim();
    invoices.push({
      id,
      number: invoice.number || "—",
      billedTo: ownerName,
      milestone: milestoneLabel,
      issuedAt: invoice.issuedAt ?? "",
      dueAt: invoice.dueAt ?? "",
      paidAt: invoice.paidAt,
      amount: amounts.total,
      subtotal: amounts.subtotal,
      additionalAmount: amounts.additionalAmount,
      note: invoice.note?.trim(),
      status,
      currency: milestone.currency || currency,
      downloadUrl: invoice.downloadUrl,
    });
    payments.push({
      id,
      reference: invoice.number || "—",
      recipient: "Assigned expert",
      milestone: milestoneLabel,
      date: (status === "paid" ? invoice.paidAt : invoice.dueAt) ?? "",
      amount: amounts.total,
      currency: milestone.currency || currency,
      status,
    });
  });
  return { invoices, payments };
};
