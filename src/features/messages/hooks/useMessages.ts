"use client";

import { useMemo, useState } from "react";

import { MessageThread } from "../types";

export const useMessages = (initialThreads: MessageThread[]) => {
  const [threads, setThreads] = useState(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState(
    initialThreads[0]?.id ?? "",
  );
  const [search, setSearch] = useState("");
  const [isConversationOpen, setIsConversationOpen] = useState(false);

  const filteredThreads = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return threads;

    return threads.filter(
      (thread) =>
        thread.participant.name.toLowerCase().includes(query) ||
        thread.preview.toLowerCase().includes(query),
    );
  }, [search, threads]);

  const activeThread = threads.find((thread) => thread.id === activeThreadId);
  const unreadCount = threads.reduce(
    (total, thread) => total + (thread.unreadCount ?? 0),
    0,
  );

  const selectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setIsConversationOpen(true);
    setThreads((current) =>
      current.map((thread) =>
        thread.id === threadId ? { ...thread, unreadCount: 0 } : thread,
      ),
    );
  };

  const sendMessage = (text: string) => {
    if (!activeThreadId) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    setThreads((current) =>
      current.map((thread) =>
        thread.id === activeThreadId
          ? {
              ...thread,
              preview: text,
              lastMessageAt: "Now",
              messages: [
                ...thread.messages,
                {
                  id: `local-${now.getTime()}`,
                  text,
                  sender: "current-user" as const,
                  time,
                  status: "sent" as const,
                },
              ],
            }
          : thread,
      ),
    );
  };

  return {
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
  };
};
