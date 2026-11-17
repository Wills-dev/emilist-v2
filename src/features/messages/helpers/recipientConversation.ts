import type { Conversation } from "../types/messaging";
import type { MessageRecipient } from "../types/recipient";

export const recipientConversation = (recipient: MessageRecipient): Conversation => ({
  chatId: "",
  participant: { _id: recipient.userId, fullName: recipient.name, email: "", displayImage: recipient.image },
  participants: [], unreadCount: 0, createdAt: "", updatedAt: "",
});
