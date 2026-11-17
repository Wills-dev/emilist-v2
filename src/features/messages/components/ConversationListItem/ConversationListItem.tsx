import { useConversationItem } from "../../hooks/useConversationItem";
import { MessageThread } from "../../types";
import MessageAvatar from "../MessageAvatar/MessageAvatar";

const ConversationListItem = ({
  thread,
  active,
  onSelect,
}: {
  thread: MessageThread;
  active: boolean;
  onSelect: (id: string) => void;
}) => {
  const { select, timestamp } = useConversationItem(thread.id, onSelect, thread.lastMessageAt);
  return (
  <button
    type="button"
    onClick={select}
    aria-pressed={active}
    className={`flex w-full items-start gap-3 border-b border-[#EAEEEB] px-4 py-3 text-left transition-colors ${
      active ? "bg-[#EAFBF1]" : "bg-white hover:bg-[#F7FAF8]"
    }`}
  >
    <MessageAvatar src={thread.participant.avatar} name={thread.participant.name} />
    <span className="min-w-0 flex-1">
      <span
        className={`block truncate font-exo text-sm font-semibold ${
          active ? "text-[#18A154]" : "text-[#292E2B]"
        }`}
      >
        {thread.participant.name}
      </span>
      <span className="mt-1 block truncate text-xs leading-4 text-[#606661]">
        {thread.preview}
      </span>
    </span>
    <span className="shrink-0 pt-1 text-[10px] text-[#8A8D8B]">
      <time dateTime={thread.lastMessageAt || undefined}>{timestamp}</time>
      {Boolean(thread.unreadCount) && <span className="mt-2 block rounded-full bg-[#18A154] px-2 py-0.5 text-center text-white">{thread.unreadCount}</span>}
    </span>
  </button>
  );
};

export default ConversationListItem;
