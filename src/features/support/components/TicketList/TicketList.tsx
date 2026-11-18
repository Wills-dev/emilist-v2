"use client";
import Button from "@/components/atoms/Button/Button";
import DataTable from "@/components/organisms/DataTable/DataTable";
import { ticketColumns } from "./ticketColumns";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { useSupportTickets } from "../../hooks/useSupportTickets";
import { supportCategories, supportStatuses, supportLabel } from "../../helpers/supportOptions";
import SupportSkeleton from "../SupportSkeleton/SupportSkeleton";

const selectStyle = "h-10 rounded-lg border border-[#E2E8ED] bg-white px-3 pr-9 text-sm text-[#474C48]";
export default function TicketList() {
  const list = useSupportTickets();
  return <section className="space-y-5">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="font-exo text-2xl font-semibold text-[#303632]">Support</h1><p className="mt-2 text-sm text-[#737774]">Track your requests and invoice disputes, and talk to our support team.</p></div><Button href="/dashboard/support/new" variant="primary" className="h-10">New ticket</Button></header>
    <div className="flex flex-wrap items-center gap-3"><label className="space-y-1 text-xs text-[#737774]">Status<select aria-label="Filter tickets by status" value={list.status} onChange={list.changeStatus} className={`block ${selectStyle}`}><option value="">All statuses</option>{supportStatuses.map((status) => <option key={status} value={status}>{supportLabel(status)}</option>)}</select></label><label className="space-y-1 text-xs text-[#737774]">Category<select aria-label="Filter tickets by category" value={list.category} onChange={list.changeCategory} className={`block ${selectStyle}`}><option value="">All categories</option>{supportCategories.map((category) => <option key={category} value={category}>{supportLabel(category)}</option>)}</select></label>{(list.status || list.category) && <button type="button" onClick={list.clear} className="text-xs text-[#FF5D7A] underline">Clear filters</button>}</div>
    {list.query.isPending ? <SupportSkeleton /> : list.query.isError ? <div role="alert" className="space-y-3 rounded-lg bg-white p-6"><p>Unable to load your tickets.</p><button type="button" onClick={list.retry} className="text-[#18A154] underline">Try again</button></div> : !list.query.data.requests.length ? <EmptyState title="No tickets found" description="Create a support ticket when you need help. For a milestone invoice dispute, use Raise Dispute on the job invoice." /> : <>
      <div className="w-full overflow-hidden rounded-xl border border-[#EDF1F6] bg-white [&_td]:px-4 [&_td]:py-5 [&_th]:px-4 [&_th]:py-4">
        <div className="border-b border-[#EDF1F6] px-4 py-4 text-xs font-medium uppercase tracking-wider text-[#18A154]">Ticket count: {list.query.data.total}</div>
        <DataTable data={list.query.data.requests} columns={ticketColumns} minWidth="min-w-240" rowClassName="odd:bg-[#F7F8FA] even:bg-white" headerClassName="text-xs font-medium text-[#7B859D]" />
      </div>
      <PaginationPanel variant="inline" page={list.page} totalPages={list.query.data.pages} onPrev={list.previous} onNext={list.next} />
    </>}
  </section>;
}
