import type { MouseEventHandler } from "react";
import type { TicketAttachment } from "../../types";
export default function TicketAttachments({ attachments, onOpen }: { attachments: TicketAttachment[]; onOpen: MouseEventHandler<HTMLButtonElement> }) {
  return <div className="flex flex-wrap gap-2">{attachments.map((attachment, index) => <button type="button" key={`${attachment.url}-${index}`} data-url={attachment.url} onClick={onOpen} className="max-w-full truncate rounded-lg border border-[#DCE3DE] bg-white px-3 py-2 text-xs text-[#07883E] underline">{attachment.name} {index + 1}</button>)}</div>;
}
