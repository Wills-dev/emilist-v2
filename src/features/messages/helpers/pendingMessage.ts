import type { Message, Participant, SendMessageInput, MessagesResponse } from "../types/messaging";
import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import { messageKeys } from "../queries/messageKeys";

export interface PendingMessage {
  message: Message;
  previousIds: Set<string>;
}
export const createPendingMessage = (userId: string, receiverId: string, chatId: string | null, input: SendMessageInput, previousIds: Set<string>): PendingMessage => {
  const timestamp = new Date().toISOString();
  return { previousIds, message: {
    _id: `pending-${crypto.randomUUID()}`, senderId: userId, receiverId, chatId: chatId ?? "",
    content: input.content.trim(), createdAt: timestamp, updatedAt: timestamp, readAt: null,
    attachments: input.files.map((file) => ({ url: "", name: file.name, mimeType: file.type, size: file.size,
      type: file.type.startsWith("image/") ? "image" : file.type.startsWith("audio/") ? "audio" : "file" })),
  } };
};
export const matchesPendingMessage = (pending: PendingMessage, message: Message) =>
  !pending.previousIds.has(message._id) && message.senderId === pending.message.senderId &&
  message.receiverId === pending.message.receiverId && (message.content ?? "").trim() === pending.message.content &&
  (message.attachments?.length ?? 0) === pending.message.attachments.length;

export const seedConfirmedHistory = (client: QueryClient, userId: string, receiver: Participant, message: Message) => {
  client.setQueryData<InfiniteData<MessagesResponse>>(messageKeys.history(userId, receiver._id), (data) => data?.pages.length ? data : {
    pages: [{ chatId: message.chatId, participant: receiver, messages: [], currentPage: 1, totalPages: 1, totalMessages: 1, limit: 30 }],
    pageParams: [1],
  });
};
