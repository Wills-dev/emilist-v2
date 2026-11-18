import type { JobInvoice } from "@/features/jobs/types/jobManagement";
import type { DisputeType } from "../types";
export const disputeOptions = (invoice: JobInvoice, isOwner: boolean): Array<{ value: DisputeType; label: string }> => {
  const additional = (invoice.additionalAmount ?? 0) > 0;
  const paid = invoice.status === "paid";
  if (isOwner) return [
    { value: "owner_unsatisfied_work", label: "Work does not meet the agreed requirements" },
    ...(additional ? [{ value: "owner_additional_cost_reason" as const, label: "I disagree with the additional cost" }] : []),
  ];
  const overdue = invoice.issuedAt && Number.isFinite(new Date(invoice.issuedAt).getTime()) && Date.now() - new Date(invoice.issuedAt).getTime() >= 7 * 24 * 60 * 60 * 1000;
  return [
    ...(additional && paid && (invoice.amountPaid ?? 0) >= (invoice.subtotal ?? invoice.amount - (invoice.additionalAmount ?? 0)) && (invoice.amountPaid ?? 0) < invoice.amount ? [{ value: "artisan_additional_cost_unpaid" as const, label: "The additional cost is unpaid" }] : []),
    ...(!paid && overdue ? [{ value: "artisan_invoice_unpaid_overdue" as const, label: "The invoice remains unpaid after 7 days" }] : []),
  ];
};
