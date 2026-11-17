import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import type { InboxResponse, Message } from "../types/messaging";
import { messageKeys } from "../queries/messageKeys";

export const updateInboxForMessage = (client: QueryClient, userId: string, message: Message, isOpen: boolean) => {
  client.setQueriesData<InfiniteData<InboxResponse>>({ queryKey: messageKeys.inboxes(userId) }, (data) => {
    if (!data?.pages.length) return data;
    const conversations = data.pages.flatMap((page) => page.conversations);
    const previous = conversations.find((item) => item.chatId === message.chatId);
    if (!previous || previous.lastMessage?._id === message._id) return data;
    const incoming = message.senderId !== userId;
    const increment = incoming && !isOpen ? 1 : 0;
    const updated = { ...previous, lastMessage: message, updatedAt: message.createdAt,
      unreadCount: previous.unreadCount + increment };
    const ordered = [updated, ...conversations.filter((item) => item.chatId !== message.chatId)];
    let offset = 0;
    return { ...data, pages: data.pages.map((page) => {
      const items = ordered.slice(offset, offset + page.conversations.length);
      offset += page.conversations.length;
      return { ...page, unreadCount: page.unreadCount + increment, conversations: items };
    }) };
  });
};
