"use client";

import { useCallback, useEffect, useState } from "react";
import { mergeMessages } from "../helpers/messageCache";
import { conversationView, messagesView } from "../helpers/messageViews";
import type { Conversation, Message, SendMessageInput } from "../types/messaging";
import type { MessageRecipient } from "../types/recipient";
import { recipientConversation } from "../helpers/recipientConversation";
import { useDesktopMessaging } from "./useDesktopMessaging";
import { useMessagingAuth } from "./useMessagingAuth";
import { useInbox, useMessageHistory } from "./useMessagingQueries";
import { useMessagingSocket } from "./useMessagingSocket";
import { useConversationRead } from "./useConversationRead";
import { useSendMessage } from "./useSendMessage";
import { useMessageTyping } from "./useMessageTyping";

export const useMessages = (recipient?: MessageRecipient, { autoSelect = false } = {}) => {
  const auth = useMessagingAuth();
  const desktop = useDesktopMessaging();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selection, setSelection] = useState<{ userId: string; conversation: Conversation } | null>(null);
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const inbox = useInbox(auth.userId, debouncedSearch, auth.enabled && !recipient);
  const selected = !auth.enabled || recipient?.userId === auth.userId ? null : recipient ? recipientConversation(recipient) : selection?.userId === auth.userId ? selection.conversation : autoSelect && desktop ? inbox.data?.pages[0]?.conversations[0] ?? null : null;
  const otherId = selected?.participant._id ?? "";
  const history = useMessageHistory(auth.userId, otherId, auth.enabled);
  const chatId = history.data?.pages[0]?.chatId || selected?.chatId || null;
  const conversationVisible = !autoSelect || desktop || isConversationOpen;
  const read = useConversationRead(auth.userId, chatId, auth.enabled && conversationVisible);
  const onIncoming = useCallback((message: Message) => {
    if (message.senderId !== auth.userId && message.chatId === chatId) void read(message.chatId);
  }, [auth.userId, chatId, read]);
  useEffect(() => {
    if (history.isSuccess) void read();
  }, [history.dataUpdatedAt, history.isSuccess, read]);
  const socket = useMessagingSocket({ token: auth.token, userId: auth.userId, activeChatId: conversationVisible ? chatId : null, onIncoming });
  const typing = useMessageTyping(socket.socketRef, otherId, chatId);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);
  const send = useSendMessage(auth.userId, selected?.participant, chatId);
  const submitMessage = async (input: SendMessageInput) => {
    const sent = await send.submit(input);
    if (sent) typing.stopTyping();
    return sent;
  };
  const conversations = auth.enabled ? inbox.data?.pages.flatMap((page) => page.conversations) ?? [] : [];
  const uniqueConversations = [...new Map(conversations.map((item) => [item.chatId, item])).values()];
  const threads = uniqueConversations.map((conversation) => conversationView(conversation, socket.onlineIds));
  const canonical = mergeMessages(history.data?.pages.flatMap((page) => page.messages) ?? []);
  const pending = send.pendingFor(canonical, otherId);
  const failed = send.failedFor(canonical, otherId);
  const failedIds = new Set(failed.map((message) => message._id));
  const messages = messagesView(mergeMessages([...canonical, ...failed, ...(pending ? [pending] : [])]), auth.userId);
  for (const message of messages) {
    if (message.id === pending?._id) message.status = "sending";
    else if (failedIds.has(message.id)) message.status = "failed";
  }
  const activeThread = selected ? { ...conversationView(selected, socket.onlineIds), id: chatId || otherId, messages } : undefined;
  const selectThread = (id: string) => {
    const conversation = uniqueConversations.find((item) => item.chatId === id);
    if (conversation) { setSelection({ userId: auth.userId, conversation }); setIsConversationOpen(true); }
  };
  const closeConversation = () => { typing.stopTyping(); setIsConversationOpen(false); if (!autoSelect) setSelection(null); };
  const retryInbox = () => { void inbox.refetch(); };
  const retryHistory = () => { void history.refetch(); };
  const loadInbox = () => { if (!inbox.isFetchingNextPage) void inbox.fetchNextPage(); };
  const loadOlder = () => { if (!history.isFetchingNextPage) void history.fetchNextPage(); };
  return {
    isConversationOpen, threads, activeThread, selectThread, closeConversation, search, setSearch, submitMessage,
    unreadCount: inbox.data?.pages[0]?.unreadCount ?? 0,
    loadingInbox: inbox.isPending, inboxError: inbox.isError, retryInbox,
    loadingMessages: history.isPending && !pending && !failed.length, historyError: history.isError && !pending && !failed.length, retryHistory,
    hasMoreInbox: inbox.hasNextPage, loadingMoreInbox: inbox.isFetchingNextPage, loadInbox,
    hasOlder: history.hasNextPage, loadingOlder: history.isFetchingNextPage, loadOlder,
    sending: send.sending, typing: socket.typingIds.includes(otherId),
    connected: socket.connected, ...typing,
  };
};
export type MessageCenter = ReturnType<typeof useMessages>;
