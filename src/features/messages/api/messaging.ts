import { axiosInstance } from "@/lib/axiosInstance";
import type { InboxResponse, MessagesResponse, Message, MarkReadResponse, SendMessageInput } from "../types/messaging";
import { validateMessage } from "../helpers/validateMessage";

export const fetchInbox = async (page: number, search: string, signal?: AbortSignal) => {
  const response = await axiosInstance.get<{ data: InboxResponse }>("/chat/fetch-all-chat", {
    params: { page, limit: 20, ...(search.trim() ? { search: search.trim() } : {}) }, signal,
  });
  if (!Array.isArray(response.data?.data?.conversations)) throw new Error("Unable to load conversations.");
  return response.data.data;
};
export const fetchMessages = async (otherUserId: string, page: number, signal?: AbortSignal) => {
  const response = await axiosInstance.get<{ data: MessagesResponse }>(`/chat/fetch-message/${encodeURIComponent(otherUserId)}`, {
    params: { page, limit: 30 }, signal,
  });
  if (!Array.isArray(response.data?.data?.messages)) throw new Error("Unable to load messages.");
  return response.data.data;
};
export const sendMessage = async (receiverId: string, input: SendMessageInput) => {
  const error = validateMessage(input);
  if (error) throw new Error(error);
  const body = new FormData();
  if (input.content.trim()) body.append("content", input.content.trim());
  input.files.forEach((file) => body.append("attachments", file));
  const response = await axiosInstance.post<{ data: Message }>(`/chat/send-message/${encodeURIComponent(receiverId)}`, body);
  if (!response.data?.data?._id) throw new Error("The server did not confirm this message.");
  return response.data.data;
};
export const markConversationRead = async (chatId: string) => {
  const response = await axiosInstance.patch<{ data: MarkReadResponse }>(`/chat/chats/${encodeURIComponent(chatId)}/read`);
  return response.data.data;
};
