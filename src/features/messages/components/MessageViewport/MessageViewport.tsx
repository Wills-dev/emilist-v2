"use client";

import { useMessageViewport } from "../../hooks/useMessageViewport";

const MessageViewport = ({ children }: { children: React.ReactNode }) => {
  const viewportRef = useMessageViewport();
  return <div ref={viewportRef} className="fixed inset-x-0 z-20 top-20 h-[calc(100dvh-5rem)] overflow-hidden md:static md:z-auto md:h-[calc(100dvh-5rem)]">{children}</div>;
};

export default MessageViewport;
