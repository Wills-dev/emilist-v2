import { messageDateLabel } from "./messageDateLabel";
import type { ChatMessage, MessageThread } from "../types";
import type { Conversation, Message } from "../types/messaging";
export const messageTime = (value: string) => new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
export const conversationView = (conversation: Conversation, onlineIds: string[]): MessageThread => ({
  id: conversation.chatId,
  participant: {
    id: conversation.participant._id,
    name: conversation.participant.fullName || [conversation.participant.firstName, conversation.participant.lastName].filter(Boolean).join(" ") || conversation.participant.userName || "User",
    avatar: conversation.participant.displayImage || conversation.participant.profileImage || "",
    isOnline: onlineIds.includes(conversation.participant._id),
  },
  preview: conversation.lastMessage?.content || (conversation.lastMessage?.attachments?.length ? "Attachment" : "Start a conversation"),
  lastMessageAt: conversation.lastMessage ? new Date(conversation.lastMessage.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "",
  unreadCount: conversation.unreadCount,
  messages: [],
});
export const messageView = (message: Message, userId: string): ChatMessage => ({
  id: message._id, text: message.content, sender: message.senderId === userId ? "current-user" : "participant",
  time: messageTime(message.createdAt), status: message.readAt ? "read" : "sent",
  attachments: message.attachments ?? [],
  dateLabel: messageDateLabel(message.createdAt),
});

export const messagesView = (messages: Message[], userId: string) => messages.map((message, index) => {
  const view = messageView(message, userId);
  const previous = messages[index - 1];
  if (previous && new Date(previous.createdAt).toDateString() === new Date(message.createdAt).toDateString()) {
    view.dateLabel = undefined;
  }
  return view;
});
