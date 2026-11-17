import type { MessageAttachment } from "./messaging";

export interface MessageParticipant {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "current-user" | "participant";
  time: string;
  status?: "sent" | "read" | "sending" | "failed";
  dateLabel?: string;
  attachments?: MessageAttachment[];
}

export interface MessageThread {
  id: string;
  participant: MessageParticipant;
  preview: string;
  /** Original ISO timestamp; the sidebar formats it in the viewer’s local time. */
  lastMessageAt: string;
  unreadCount?: number;
  messages: ChatMessage[];
}
