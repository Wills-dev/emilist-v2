import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import type { Message, MessagesResponse, MessagesReadEvent } from "../types/messaging";
import { messageKeys } from "../queries/messageKeys";

export const mergeMessages = (messages: Message[]) => {
  const unique = new Map<string, Message>();
  for (const message of messages) {
    const previous = unique.get(message._id);
    unique.set(message._id, { ...message, readAt: message.readAt ?? previous?.readAt ?? null });
  }
  return [...unique.values()].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
};
export const cacheMessage = (client: QueryClient, userId: string, message: Message) => {
  const otherId = message.senderId === userId ? message.receiverId : message.senderId;
  client.setQueryData<InfiniteData<MessagesResponse>>(messageKeys.history(userId, otherId), (data) => {
    if (!data?.pages.length) return data;
    return { ...data, pages: data.pages.map((page, index) => ({ ...page,
      chatId: page.chatId || message.chatId,
      messages: index === 0 ? mergeMessages([...page.messages, message]) : page.messages,
    })) };
  });
};
export const cacheReadReceipts = (client: QueryClient, userId: string, event: MessagesReadEvent) => {
  const ids = new Set(event.messageIds);
  client.setQueriesData<InfiniteData<MessagesResponse>>({ queryKey: messageKeys.user(userId) }, (data) => {
    if (!data?.pages?.some((page) => Array.isArray(page.messages))) return data;
    return { ...data, pages: data.pages.map((page) => ({ ...page,
      messages: page.messages.map((message) => message.chatId === event.chatId && ids.has(message._id)
        ? { ...message, readAt: event.readAt } : message),
    })) };
  });
};
