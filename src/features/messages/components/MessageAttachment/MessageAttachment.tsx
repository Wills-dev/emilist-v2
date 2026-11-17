import Image from "next/image";
import type { MessageAttachment as Attachment } from "../../types/messaging";
import { attachmentUrl } from "../../helpers/attachmentUrl";
const MessageAttachment = ({ attachment }: { attachment: Attachment }) => (
  <div className="mt-2">
    {!attachmentUrl(attachment.url) ? <p>Attachment unavailable</p> : attachment.type === "image" ? (
      <a href={attachmentUrl(attachment.url)} target="_blank" rel="noreferrer"><Image unoptimized src={attachmentUrl(attachment.url)!} alt={attachment.name || "Image attachment"} width={400} height={300} className="h-auto max-h-72 w-auto max-w-full rounded-lg object-contain" /></a>
    ) : attachment.type === "audio" ? <audio src={attachmentUrl(attachment.url)} controls preload="none" className="max-w-full" aria-label={attachment.name || "Audio attachment"} /> : (
      <a href={attachmentUrl(attachment.url)} target="_blank" rel="noreferrer" className="block break-all rounded-lg border border-[#D9E5DD] bg-white/60 p-2 underline">{attachment.name || "Download attachment"}</a>
    )}
  </div>
);
export default MessageAttachment;
