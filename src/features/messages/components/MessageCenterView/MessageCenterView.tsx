import type { MessageCenter } from "../../hooks/useMessages";
import InboxPanel from "../InboxPanel/InboxPanel";
import ChatPanel from "../ChatPanel/ChatPanel";

const MessageCenterView = ({ center }: { center: MessageCenter }) => (
  <div className="grid h-full min-h-0 min-w-0 overflow-hidden md:grid-cols-[280px_minmax(0,1fr)] md:gap-2">
    <InboxPanel center={center} className={center.activeThread ? "hidden md:flex" : "flex"} />
    <ChatPanel center={center} className={center.activeThread ? "flex" : "hidden md:flex"} />
  </div>
);

export default MessageCenterView;
