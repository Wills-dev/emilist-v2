import { Check, CheckCheck, Clock3, CircleAlert } from "lucide-react";
import type { ChatMessage } from "../../types";

const MessageDeliveryStatus = ({ status = "sent" }: { status: ChatMessage["status"] }) => (
  <span role="img" aria-label={status === "sending" ? "Message pending" : status === "failed" ? "Message failed" : status === "read" ? "Message read" : "Message sent"}
    title={status === "failed" ? "Message failed. Your draft is available to retry." : undefined}
    className={status === "failed" ? "text-[#FF5D7A]" : status === "read" ? "text-[#18A154]" : "text-[#8A8D8B]"}
  >
    {status === "sending" ? <Clock3 className="size-3" aria-hidden="true" /> : status === "failed" ? <CircleAlert className="size-3" aria-hidden="true" /> : status === "read" ? <CheckCheck className="size-3.5" aria-hidden="true" /> : <Check className="size-3" aria-hidden="true" />}
  </span>
);

export default MessageDeliveryStatus;
