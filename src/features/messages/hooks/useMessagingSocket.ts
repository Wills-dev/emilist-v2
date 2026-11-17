"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { cacheMessage, cacheReadReceipts } from "../helpers/messageCache";
import { updateInboxForMessage } from "../helpers/inboxCache";
import { playMessageSound, subscribeMessageSound } from "../audio/messageSound";
import { messageKeys } from "../queries/messageKeys";
import type { Message, MessagesReadEvent, TypingEvent } from "../types/messaging";

export const useMessagingSocket = ({ token, userId, onIncoming, activeChatId }: {
  token: string | null; userId: string; activeChatId: string | null; onIncoming: (message: Message) => void;
}) => {
  const client = useQueryClient();
  const socketRef = useRef<Socket | null>(null);
  const [onlineIds, setOnlineIds] = useState<string[]>([]);
  const [typingIds, setTypingIds] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const incoming = useEffectEvent((message: Message) => {
    updateInboxForMessage(client, userId, message, message.chatId === activeChatId && document.visibilityState === "visible");
    onIncoming(message);
  });
  useEffect(() => {
    if (!token || !userId || !process.env.NEXT_PUBLIC_SOCKET_URL) return;
    const unsubscribeSound = subscribeMessageSound();
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token }, reconnection: true, reconnectionDelay: 1000,
    });
    socketRef.current = socket;
    const typingTimers = new Map<string, ReturnType<typeof setTimeout>>();
    const seen = new Set<string>();
    const receive = (message: Message, received = false) => {
      cacheMessage(client, userId, message);
      if (seen.has(message._id)) return;
      seen.add(message._id);
      if (seen.size > 1000) seen.delete(seen.values().next().value!);
      if (received && message.senderId !== userId && message.receiverId === userId) void playMessageSound(userId, message);
      incoming(message);
      const otherId = message.senderId === userId ? message.receiverId : message.senderId;
      // Fetch only if history has not loaded yet; avoid a loading flash on every echo.
      if (!client.getQueryData(messageKeys.history(userId, otherId))) {
        void client.invalidateQueries({ queryKey: messageKeys.history(userId, otherId) });
      }
      void client.invalidateQueries({ queryKey: messageKeys.inboxes(userId) });
    };
    const stop = ({ senderId }: TypingEvent) => {
      clearTimeout(typingTimers.get(senderId));
      typingTimers.delete(senderId);
      setTypingIds((ids) => ids.filter((id) => id !== senderId));
    };
    socket.on("newMessage", (message: Message) => receive(message, true));
    socket.on("messageSent", (message: Message) => receive(message));
    socket.on("messagesRead", (event: MessagesReadEvent) => cacheReadReceipts(client, userId, event));
    socket.on("getOnlineUsers", (ids: string[]) => setOnlineIds(ids));
    socket.on("typing", (event: TypingEvent) => {
      setTypingIds((ids) => ids.includes(event.senderId) ? ids : [...ids, event.senderId]);
      clearTimeout(typingTimers.get(event.senderId));
      typingTimers.set(event.senderId, setTimeout(() => stop(event), 4000));
    });
    socket.on("stopTyping", stop);
    socket.on("connect", () => {
      setConnected(true);
      void client.invalidateQueries({ queryKey: messageKeys.user(userId) });
    });
    const disconnect = () => { setConnected(false); setOnlineIds([]); setTypingIds([]); };
    socket.on("disconnect", disconnect);
    socket.on("connect_error", disconnect);
    return () => {
      unsubscribeSound();
      typingTimers.forEach(clearTimeout);
      socket.removeAllListeners(); socket.disconnect(); socketRef.current = null;
    };
  }, [token, userId, client]);
  return { socketRef, onlineIds, typingIds, connected: Boolean(token && userId && connected) };
};
