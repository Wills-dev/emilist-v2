import { MessageThread } from "../../types";
import MessageAvatar from "../MessageAvatar/MessageAvatar";

const ConversationListItem = ({
  thread,
  active,
  onSelect,
}: {
  thread: MessageThread;
  active: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    onClick={onSelect}
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
      <span className="mt-1 line-clamp-2 block text-xs leading-4 text-[#606661]">
        {thread.preview}
      </span>
    </span>
    <span className="shrink-0 pt-1 text-[10px] text-[#8A8D8B]">
      {thread.lastMessageAt}
    </span>
  </button>
);

export default ConversationListItem;
