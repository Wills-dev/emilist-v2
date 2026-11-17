import type { MessageCenter } from "../../hooks/useMessages";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageHistory from "../MessageHistory/MessageHistory";
import MessageComposer from "../MessageComposer/MessageComposer";
import MessagesEmptyState from "../MessagesEmptyState/MessagesEmptyState";

const ChatPanel = ({ center, className = "", showBack = true }: { center: MessageCenter; className?: string; showBack?: boolean }) => (
  <section
    className={`min-h-0 min-w-0 flex-col overflow-hidden bg-white ${className}`}
    aria-label={center.activeThread ? `Conversation with ${center.activeThread.participant.name}` : "Messages"}
  >
    {!center.activeThread ? <MessagesEmptyState /> : <>
      <ChatHeader thread={center.activeThread} typing={center.typing} onBack={center.closeConversation} showBack={showBack} />
      <MessageHistory key={center.activeThread.participant.id} center={center} />
      <div className="border-t border-[#F0F2F1] bg-white p-3">
        <MessageComposer
          key={center.activeThread.participant.id}
          onSend={center.submitMessage}
          sending={center.sending}
          onTyping={center.sendTyping}
          onStopTyping={center.stopTyping}
        />
      </div>
    </>}
  </section>
);

export default ChatPanel;
