import type { JobInvoice } from "../types/jobManagement";

export const getInvoiceDisplay = (invoice: JobInvoice) => {
  const status = invoice.status ?? (invoice.paidAt ? "paid" : "unpaid");
  const paid = status === "paid";
  return {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    paid,
    date: paid ? invoice.paidAt ?? "" : invoice.dueAt,
  };
};
