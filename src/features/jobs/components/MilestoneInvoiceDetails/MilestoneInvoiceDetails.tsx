import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import type { JobDetailsViewModel } from "../../types/jobDetails";

const MilestoneInvoiceDetails = ({ invoice, paymentStatus, currency }: {
  invoice: JobDetailsViewModel["milestones"][number]["invoice"];
  paymentStatus?: string;
  currency: string;
}) => {
  if (!invoice?.invoiceRaised) return null;
  return <section className="space-y-3 rounded-lg border border-[#ECECEC] bg-white p-4">
    <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-semibold">Invoice submitted</h3><StatusBadge label={paymentStatus || "unpaid"} /></div>
    <PriceWrapper price={invoice.additionalAmount} currency={currency} title="additional costs" />
    <PriceWrapper price={invoice.totalAmount} currency={currency} title="invoice total" />
    {invoice.note && <p className="whitespace-pre-wrap wrap-anywhere text-sm text-[#707471]">{invoice.note}</p>}
  </section>;
};

export default MilestoneInvoiceDetails;
