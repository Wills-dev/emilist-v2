"use client";

import { AnimatePresence, motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";

import { messageThreads } from "../../constants/dummyMessages";
import { MessageThread } from "../../types";
import { useMessages } from "../../hooks/useMessages";
import ChatPanel from "../ChatPanel/ChatPanel";
import InboxPanel from "../InboxPanel/InboxPanel";
import MessagesEmptyState from "../MessagesEmptyState/MessagesEmptyState";

const MessagesWrapper = ({
  initialThreads = messageThreads,
}: {
  initialThreads?: MessageThread[];
}) => {
  const {
    threads,
    filteredThreads,
    activeThread,
    activeThreadId,
    unreadCount,
    search,
    isConversationOpen,
    setSearch,
    setIsConversationOpen,
    selectThread,
    sendMessage,
  } = useMessages(initialThreads);

  if (!threads.length) {
    return (
      <Container variant="small" className="py-4">
        <MessagesEmptyState />
      </Container>
    );
  }

  return (
    <Container variant="small" className="py-4">
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="min-h-[calc(100vh-7rem)] overflow-hidden border border-[#E9EDEB] md:grid md:h-[calc(100vh-7rem)] md:grid-cols-[280px_minmax(0,1fr)] md:gap-2"
      >
        <div className="min-h-[calc(100vh-7rem)] overflow-hidden md:hidden">
          <AnimatePresence initial={false} mode="wait">
            {isConversationOpen && activeThread ? (
              <motion.div
                key="mobile-chat"
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 36 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="h-[calc(100vh-7rem)]"
              >
                <ChatPanel
                  thread={activeThread}
                  onBack={() => setIsConversationOpen(false)}
                  onSend={sendMessage}
                  className="flex h-full"
                />
              </motion.div>
            ) : (
              <motion.div
                key="mobile-inbox"
                initial={{ opacity: 0, x: -36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="h-[calc(100vh-7rem)]"
              >
                <InboxPanel
                  threads={filteredThreads}
                  activeThreadId={activeThreadId}
                  unreadCount={unreadCount}
                  search={search}
                  onSearch={setSearch}
                  onSelect={selectThread}
                  className="flex h-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden min-h-0 md:contents">
          <InboxPanel
            threads={filteredThreads}
            activeThreadId={activeThreadId}
            unreadCount={unreadCount}
            search={search}
            onSearch={setSearch}
            onSelect={selectThread}
            className="flex"
          />

          {activeThread && (
            <ChatPanel
              thread={activeThread}
              onBack={() => setIsConversationOpen(false)}
              onSend={sendMessage}
              className="flex"
            />
          )}
        </div>
      </motion.main>
    </Container>
  );
};

export default MessagesWrapper;
