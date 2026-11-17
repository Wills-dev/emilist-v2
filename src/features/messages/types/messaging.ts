export type AttachmentType = "image" | "file" | "audio";
export interface MessageAttachment {
  url: string; name: string; mimeType: string; size: number; type: AttachmentType;
}
export interface Message {
  _id: string; senderId: string; receiverId: string; chatId: string;
  content: string; attachments: MessageAttachment[]; readAt: string | null;
  createdAt: string; updatedAt: string;
}
export interface Participant {
  _id: string; firstName?: string; lastName?: string; fullName: string;
  userName?: string; email: string; displayImage?: string; profileImage?: string;
}
export interface Conversation {
  chatId: string; participant: Participant; participants: Participant[];
  lastMessage?: Message; unreadCount: number; createdAt: string; updatedAt: string;
}
export interface Pagination {
  currentPage: number; totalPages: number; limit: number;
}
export interface InboxResponse extends Pagination {
  conversations: Conversation[]; unreadCount: number; totalConversations: number;
}
export interface MessagesResponse extends Pagination {
  chatId: string | null; participant: Participant; messages: Message[]; totalMessages: number;
}
export interface MarkReadResponse {
  chatId: string; markedCount: number; messageIds: string[]; readAt: string;
}
export interface MessagesReadEvent {
  chatId: string; readerId: string; messageIds: string[]; readAt: string;
}
export interface TypingEvent { senderId: string; chatId: string | null }
export interface SendMessageInput { content: string; files: File[] }
