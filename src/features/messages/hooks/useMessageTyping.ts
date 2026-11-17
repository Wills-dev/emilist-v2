import { useCallback, useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";
import type { RefObject } from "react";
export const useMessageTyping = (socketRef: RefObject<Socket | null>, receiverId: string, chatId: string | null) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stopTyping = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    if (receiverId) socketRef.current?.emit("stopTyping", { receiverId, chatId });
  }, [receiverId, chatId, socketRef]);
  const sendTyping = useCallback(() => {
    if (!receiverId) return;
    socketRef.current?.emit("typing", { receiverId, chatId });
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(stopTyping, 1200);
  }, [receiverId, chatId, socketRef, stopTyping]);
  useEffect(() => stopTyping, [stopTyping]);
  return { sendTyping, stopTyping };
};
