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
  status?: "sent" | "read";
  dateLabel?: string;
}

export interface MessageThread {
  id: string;
  participant: MessageParticipant;
  preview: string;
  lastMessageAt: string;
  unreadCount?: number;
  messages: ChatMessage[];
}
