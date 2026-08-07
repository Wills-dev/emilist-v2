import SearchBar from "@/components/molecules/SearchBar/SearchBar";

import { MessageThread } from "../../types";
import ConversationListItem from "../ConversationListItem/ConversationListItem";

const InboxPanel = ({
  threads,
  activeThreadId,
  unreadCount,
  search,
  onSearch,
  onSelect,
  className = "",
}: {
  threads: MessageThread[];
  activeThreadId: string;
  unreadCount: number;
  search: string;
  onSearch: (query: string) => void;
  onSelect: (threadId: string) => void;
  className?: string;
}) => (
  <section
    className={`min-h-0 flex-col bg-white ${className}`}
    aria-label="Inbox"
  >
    <div className="border-b border-[#E6EAE7] px-4 pb-4 pt-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="font-exo text-xl font-semibold text-[#1E2922]">Inbox</h1>
        <span className="rounded-md bg-[#FFF0F3] px-2 py-1 text-[10px] text-[#FF5D7A]">
          {unreadCount} new messages
        </span>
      </div>
      <SearchBar
        setSearch={onSearch}
        onSubmit={onSearch}
        placeholder="Search"
        variant="secondary"
      />
    </div>

    <div className="min-h-0 flex-1 overflow-y-auto">
      {threads.length ? (
        threads.map((thread) => (
          <ConversationListItem
            key={thread.id}
            thread={thread}
            active={thread.id === activeThreadId}
            onSelect={() => onSelect(thread.id)}
          />
        ))
      ) : (
        <p className="px-4 py-10 text-center text-sm text-[#737774]">
          No conversations match “{search}”.
        </p>
      )}
    </div>
  </section>
);

export default InboxPanel;
