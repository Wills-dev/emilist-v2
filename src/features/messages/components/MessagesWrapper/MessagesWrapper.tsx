"use client";

import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/atoms/Container/Container";
import { useMessages } from "../../hooks/useMessages";
import ChatPanel from "../ChatPanel/ChatPanel";
import InboxPanel from "../InboxPanel/InboxPanel";
import MessageViewport from "../MessageViewport/MessageViewport";
import MessagesEmptyState from "../MessagesEmptyState/MessagesEmptyState";

const MessagesWrapper = () => {
  const center = useMessages(undefined, { autoSelect: true });
  if (!center.loadingInbox && !center.inboxError && !center.threads.length && !center.search) return (
    <MessageViewport><Container variant="small" className="h-full py-2 md:py-4"><MessagesEmptyState pageEmpty /></Container></MessageViewport>
  );
  return (
    <MessageViewport>
    <Container variant="small" className="flex h-full min-h-0 flex-col py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:py-4">
      <motion.main
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="min-h-0 flex-1 overflow-hidden border border-[#E9EDEB] md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-2"
      >
        <div className="h-full min-h-0 overflow-hidden md:hidden">
          <AnimatePresence initial={false} mode="wait">
            {center.isConversationOpen && center.activeThread ? (
              <motion.div key="mobile-chat" initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 36 }} transition={{ duration: 0.24, ease: "easeOut" }} className="h-full min-h-0">
                <ChatPanel center={center} className="flex h-full" />
              </motion.div>
            ) : (
              <motion.div key="mobile-inbox" initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -36 }} transition={{ duration: 0.24, ease: "easeOut" }} className="h-full min-h-0">
                <InboxPanel center={center} className="flex h-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="hidden min-h-0 md:contents">
          <InboxPanel center={center} className="flex" />
          {center.activeThread && <ChatPanel center={center} className="flex" />}
        </div>
      </motion.main>
    </Container>
    </MessageViewport>
  );
};

export default MessagesWrapper;
