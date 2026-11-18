"use client";
import Button from "@/components/atoms/Button/Button";
import BackButton from "@/components/atoms/BackButton/BackButton";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import TicketPriority from "../TicketList/TicketPriority";
import TicketWorkflowBadge from "../TicketList/TicketWorkflowBadge";
import TicketStatusBadge from "../TicketList/TicketStatusBadge";
import TicketMessageBubble from "./TicketMessageBubble";
import TicketReplyComposer from "./TicketReplyComposer";
import ImagePreview from "@/components/atoms/ImagePreview/ImagePreview";
import { useTicketDetail } from "../../hooks/useTicketDetail";
import { supportDate, supportLabel } from "../../helpers/supportOptions";
import SupportSkeleton from "../SupportSkeleton/SupportSkeleton";
import TicketAttachments from "./TicketAttachments";

export default function TicketDetail({ requestId }: { requestId: string }) {
  const detail = useTicketDetail(requestId);
  const ticket = detail.query.data;
  if (detail.query.isPending) return <SupportSkeleton detail />;
  if (detail.query.isError || !ticket) return <div role="alert" className="space-y-4"><BackButton href="/dashboard/support" isDashboard /><p>Unable to load this ticket.</p><Button variant="default" onClick={detail.refresh}>Try again</Button></div>;
  return <main className="space-y-5">
    <div className="flex items-center justify-between gap-3"><BackButton href="/dashboard/support" isDashboard /><Button variant="default" className="h-9 text-xs" onClick={detail.refresh} disabled={detail.query.isFetching}>Refresh ticket</Button></div>
    <section className="w-full space-y-4 rounded-2xl border border-[#EDF1F6] bg-white p-4 sm:p-6"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-sm text-[#7B859D]">{ticket.ticketCode}</p><h1 className="mt-2 break-words font-exo text-xl font-semibold text-[#172033]">{ticket.subject}</h1></div><TicketStatusBadge status={ticket.displayStatus} /></div><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#7B859D]"><TicketWorkflowBadge status={ticket.status} /><span>{supportLabel(ticket.category)}</span><span className="flex items-center gap-2">Priority: <TicketPriority priority={ticket.priority} badge /></span><time>{supportDate(ticket.createdAt)}</time>{ticket.queueTime && <span>{ticket.queueTimeLabel || "Queue time"}: {ticket.queueTime}</span>}</div><div className="flex flex-wrap gap-3">{ticket.jobId && <IdentifierBadge label="Job ID" value={ticket.jobId} />}{ticket.milestoneId && <IdentifierBadge label="Milestone ID" value={ticket.milestoneId} />}{ticket.invoiceId && <IdentifierBadge label="Invoice ID" value={ticket.invoiceId} />}{ticket.linkedRecordId && <IdentifierBadge label={`${supportLabel(ticket.linkedType)} ID`} value={ticket.linkedRecordId} />}</div></section>
    {ticket.resolution && <section className="space-y-2 rounded-lg border border-[#BFEACF] bg-[#EAFBF1] p-5"><h2 className="font-semibold text-[#07883E]">Resolution</h2><p className="whitespace-pre-wrap break-words text-sm text-[#172033]">{ticket.resolution}</p></section>}
    <section className="w-full overflow-hidden rounded-2xl border border-[#EDF1F6] bg-white">
      <div className="border-b border-[#EDF1F6] px-4 py-5 sm:px-6"><h2 className="font-exo text-lg font-semibold text-[#172033]">Conversation</h2></div>
      <div className="space-y-7 px-4 py-6 sm:space-y-10 sm:px-6">
        {ticket.description && !ticket.messages.some((message) => message.message.trim() === ticket.description.trim()) && <TicketMessageBubble message={{ id: "initial", sender: "You", senderRole: "customer", createdAt: ticket.createdAt, message: ticket.description, attachments: [] }} onOpen={detail.openImage} />}
        <TicketAttachments attachments={ticket.attachments} onOpen={detail.openImage} />
        {ticket.messages.map((message) => <TicketMessageBubble key={message.id} message={message} onOpen={detail.openImage} />)}
      </div>
      {ticket.status === "resolved" ? <p className="border-t border-[#EDF1F6] p-5 text-sm text-[#7B859D]">This ticket is resolved and no longer accepts replies.</p> : <TicketReplyComposer detail={detail} />}
    </section>
    {detail.image && <ImagePreview imageUrl={detail.image} alt="Support attachment" onCancel={detail.closeImage} unoptimized />}
  </main>;
}
