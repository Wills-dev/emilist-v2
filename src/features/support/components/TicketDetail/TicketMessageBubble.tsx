import type { MouseEventHandler } from "react";
import type { TicketMessage } from "../../types";
import { supportInitials, supportMessageTime, isSupportStaff } from "../../helpers/conversationDisplay";
import TicketAttachments from "./TicketAttachments";

export default function TicketMessageBubble({ message, onOpen }: { message: TicketMessage; onOpen: MouseEventHandler<HTMLButtonElement> }) {
  const staff = isSupportStaff(message.senderRole);
  return <article className={`flex w-full items-start gap-3 sm:gap-4 ${staff ? "flex-row-reverse" : ""}`}>
    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-[#CCF8E4] text-xs font-semibold text-[#00A674] sm:size-11 sm:text-sm">{supportInitials(message.sender)}</span>
    <div className="min-w-0 flex-1 space-y-3 rounded-2xl bg-[#F7F8FA] p-4 sm:p-5"><div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#7B859D]"><span>{message.sender}</span>{message.createdAt && <><span aria-hidden="true">·</span><time dateTime={message.createdAt}>{supportMessageTime(message.createdAt)}</time></>}</div><p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#172033]">{message.message}</p><TicketAttachments attachments={message.attachments} onOpen={onOpen} /></div>
  </article>;
}
