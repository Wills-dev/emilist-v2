import { ArrowLeft } from "lucide-react";

import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";

import { MessageThread } from "../../types";
import MessageAvatar from "../MessageAvatar/MessageAvatar";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "../MessageComposer/MessageComposer";

const ChatPanel = ({
  thread,
  onBack,
  onSend,
  className = "",
}: {
  thread: MessageThread;
  onBack: () => void;
  onSend: (message: string) => void;
  className?: string;
}) => (
  <section
    className={`min-h-0 flex-col overflow-hidden bg-white ${className}`}
    aria-label={`Conversation with ${thread.participant.name}`}
  >
    <header className="flex min-h-16 items-center justify-between bg-linear-to-r from-[#0F6B4B] to-[#215342] px-4 text-white sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to inbox"
          className="md:hidden"
        >
          <ArrowLeft className="size-5" />
        </button>
        <MessageAvatar
          src={thread.participant.avatar}
          name={thread.participant.name}
        />
        <h2 className="truncate font-exo text-sm font-semibold">
          {thread.participant.name}
        </h2>
      </div>
      <span className="rounded bg-[#25C269] px-2 py-0.5 text-[10px]">
        {thread.participant.isOnline ? "Online" : "Offline"}
      </span>
    </header>

    <div className="relative min-h-0 flex-1 overflow-hidden">
      <GrayedLogo variant="message" />

      <div className="relative z-1 h-full space-y-4 overflow-y-auto px-4 py-4 sm:px-6">
        {thread.messages.map((message) => (
          <div key={message.id}>
            {message.dateLabel && (
              <p className="mb-2 text-center text-[10px] text-[#5A6E82]">
                {message.dateLabel}
              </p>
            )}
            <MessageBubble message={message} />
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-[#F0F2F1] bg-white p-3">
      <MessageComposer onSend={onSend} />
    </div>
  </section>
);

export default ChatPanel;
