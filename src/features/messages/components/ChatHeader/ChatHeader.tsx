import { ArrowLeft } from "lucide-react";
import type { MessageThread } from "../../types";
import MessageAvatar from "../MessageAvatar/MessageAvatar";

const ChatHeader = ({ thread, typing, onBack, showBack = true }: {
  thread: MessageThread;
  typing: boolean;
  onBack: () => void;
  showBack?: boolean;
}) => (
  <header className="flex min-h-16 items-center justify-between gap-3 bg-linear-to-r from-[#0F6B4B] to-[#215342] px-4 text-white sm:px-5">
    <div className="flex min-w-0 items-center gap-3">
      {showBack && <button type="button" onClick={onBack} aria-label="Back to inbox" className="md:hidden">
        <ArrowLeft className="size-5" />
      </button>}
      <MessageAvatar src={thread.participant.avatar} name={thread.participant.name} />
      <h2 className="truncate font-exo text-sm font-semibold">{thread.participant.name}</h2>
    </div>
    <span
      role="status"
      className={`shrink-0 rounded px-2 py-0.5 text-[10px] ${typing || thread.participant.isOnline ? "bg-[#25C269]" : "bg-[#E84F6A]"}`}
    >
      {typing ? "Typing…" : thread.participant.isOnline ? "Online" : "Offline"}
    </span>
  </header>
);

export default ChatHeader;
