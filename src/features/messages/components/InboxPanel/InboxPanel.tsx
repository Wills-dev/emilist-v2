import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import type { MessageCenter } from "../../hooks/useMessages";
import ConversationListItem from "../ConversationListItem/ConversationListItem";
import MessagingSkeleton from "../MessagingSkeleton/MessagingSkeleton";

const InboxPanel = ({ center, className = "" }: { center: MessageCenter; className?: string }) => (
  <section className={`min-h-0 flex-col bg-white ${className}`} aria-label="Inbox">
    <div className="border-b border-[#E6EAE7] px-4 pb-4 pt-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="font-exo text-xl font-semibold text-[#1E2922]">Inbox</h1>
        <span className="rounded-md bg-[#FFF0F3] px-2 py-1 text-[10px] text-[#FF5D7A]">{center.unreadCount.toLocaleString()} new messages</span>
      </div>
      <SearchBar setSearch={center.setSearch} onSubmit={center.setSearch} placeholder="Search conversations" variant="secondary" showVoiceIcon={false} />
    </div>
    <div className="min-h-0 flex-1 overflow-y-auto">
      {center.loadingInbox ? <MessagingSkeleton variant="inbox" /> : center.inboxError ? (
        <div role="alert" className="space-y-2 p-4 text-center text-sm text-[#737774]">
          <p>Unable to load conversations.</p><button type="button" onClick={center.retryInbox} className="text-[#18A154]">Try again</button>
        </div>
      ) : center.threads.length ? center.threads.map((thread) => (
        <ConversationListItem key={thread.id} thread={thread} active={thread.id === center.activeThread?.id} onSelect={center.selectThread} />
      )) : <p className="px-4 py-10 text-center text-sm text-[#737774]">{center.search ? `No conversations match “${center.search}”.` : "No conversations yet."}</p>}
      {center.hasMoreInbox && <button type="button" onClick={center.loadInbox} disabled={center.loadingMoreInbox} className="h-10 w-full text-sm text-[#18A154] disabled:opacity-50">{center.loadingMoreInbox ? "Loading…" : "Load more conversations"}</button>}
    </div>
  </section>
);
export default InboxPanel;
