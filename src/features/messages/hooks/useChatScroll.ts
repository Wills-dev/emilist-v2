import { useLayoutEffect, useRef } from "react";
import type { ChatMessage } from "../types";
export const useChatScroll = (messages: ChatMessage[]) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinned = useRef(true);
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
      pinned.current = true;
    }
    previous.current = { firstId, lastId, height: element.scrollHeight };
  }, [messages]);
  useLayoutEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const trackPosition = () => { pinned.current = element.scrollHeight - element.clientHeight - element.scrollTop < 48; };
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
      if (pinned.current) element.scrollTop = element.scrollHeight;
    });
    element.addEventListener("scroll", trackPosition, { passive: true });
    resize?.observe(element);
    return () => { element.removeEventListener("scroll", trackPosition); resize?.disconnect(); };
  }, []);
  return scrollRef;
};
