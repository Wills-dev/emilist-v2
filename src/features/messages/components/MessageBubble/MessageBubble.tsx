import type { ChatMessage } from "../../types";
import MessageDeliveryStatus from "../MessageDeliveryStatus/MessageDeliveryStatus";
import MessageAttachment from "../MessageAttachment/MessageAttachment";
const MessageBubble = ({ message }: { message: ChatMessage }) => (
  <div className={`flex flex-col ${message.sender === "current-user" ? "items-end" : "items-start"}`}>
    {message.dateLabel && <p className="mb-2 self-center text-[10px] text-[#5A6E82]">{message.dateLabel}</p>}
    <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-5 sm:max-w-[62%] ${message.sender === "current-user" ? "rounded-br-xs bg-[#DDF8E8] text-[#39704F]" : "rounded-bl-xs bg-[#EFEFEF] text-[#303632]"}`}>
      {message.text && <p className="whitespace-pre-wrap wrap-anywhere">{message.text}</p>}
      {message.attachments?.map((attachment, index) => (message.status === "sending" || message.status === "failed") ? <span key={index} className="mt-2 block break-all">{attachment.name}</span> : <MessageAttachment key={`${attachment.url}-${index}`} attachment={attachment} />)}
    </div>
    <span className="mt-1 flex items-center gap-1 text-[10px] text-[#8A8D8B]">
      <time>{message.time}</time>
      {message.sender === "current-user" && <MessageDeliveryStatus status={message.status} />}
    </span>
  </div>
);
export default MessageBubble;
