import { useLayoutEffect, useRef } from "react";
import type { ChatMessage } from "../types";
export const useChatScroll = (messages: ChatMessage[]) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const previous = useRef({ firstId: "", lastId: "", height: 0 });
  useLayoutEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const firstId = messages[0]?.id ?? "";
    const lastId = messages.at(-1)?.id ?? "";
    if (previous.current.lastId === lastId && previous.current.firstId !== firstId) {
      element.scrollTop += element.scrollHeight - previous.current.height;
    } else if (previous.current.lastId !== lastId) {
      element.scrollTop = element.scrollHeight;
    }
    previous.current = { firstId, lastId, height: element.scrollHeight };
  }, [messages]);
  return scrollRef;
};
