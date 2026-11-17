import { useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { markConversationRead } from "../api/messaging";
import { messageKeys } from "../queries/messageKeys";

export const useConversationRead = (userId: string, chatId: string | null, enabled: boolean) => {
  const client = useQueryClient();
  const pending = useRef(new Set<string>());
  const queued = useRef(new Set<string>());
  const read = useCallback(async (id = chatId) => {
    if (!enabled || !id || document.visibilityState !== "visible") return;
    if (pending.current.has(id)) { queued.current.add(id); return; }
    pending.current.add(id);
    try {
      do {
        queued.current.delete(id);
        await markConversationRead(id);
      } while (queued.current.has(id) && document.visibilityState === "visible");
      await client.invalidateQueries({ queryKey: messageKeys.inboxes(userId) });
    } catch {
      // Keep unread badges intact when the server cannot confirm the read.
    } finally { pending.current.delete(id); }
  }, [chatId, client, enabled, userId]);
  useEffect(() => {
    void read();
    const visible = () => { if (document.visibilityState === "visible") void read(); };
    document.addEventListener("visibilitychange", visible);
    return () => document.removeEventListener("visibilitychange", visible);
  }, [read]);
  return read;
};
