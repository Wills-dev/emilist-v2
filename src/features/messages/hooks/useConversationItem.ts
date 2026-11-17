import { conversationTimestamp } from "../helpers/conversationTimestamp";

export const useConversationItem = (id: string, onSelect: (id: string) => void, lastMessageAt: string) => {
  const select = () => onSelect(id);
  return { select, timestamp: conversationTimestamp(lastMessageAt) };
};
