import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";
import type { MessageCenter } from "../../hooks/useMessages";
import { useChatScroll } from "../../hooks/useChatScroll";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessagesEmptyState from "../MessagesEmptyState/MessagesEmptyState";
import MessagingSkeleton from "../MessagingSkeleton/MessagingSkeleton";

const MessageHistory = ({ center }: { center: MessageCenter }) => {
  const messages = center.activeThread?.messages ?? [];
  const scrollRef = useChatScroll(messages);
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <GrayedLogo variant="message" />
      <div ref={scrollRef} className="relative z-1 h-full space-y-4 overflow-y-auto overscroll-contain touch-pan-y px-4 py-4 sm:px-6">
        {center.loadingMessages ? <MessagingSkeleton variant="chat" /> : center.historyError ? (
          <div role="alert" className="text-center text-sm text-[#737774]">
            Unable to load messages.{" "}
            <button type="button" onClick={center.retryHistory} className="text-[#18A154]">Try again</button>
          </div>
        ) : <>
          {center.hasOlder && (
            <button
              type="button"
              onClick={center.loadOlder}
              disabled={center.loadingOlder}
              className="h-9 w-full text-xs text-[#18A154] disabled:opacity-50"
            >
              {center.loadingOlder ? "Loading…" : "Load older messages"}
            </button>
          )}
          {!messages.length && <MessagesEmptyState conversation />}
          {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
        </>}
      </div>
    </div>
  );
};

export default MessageHistory;
