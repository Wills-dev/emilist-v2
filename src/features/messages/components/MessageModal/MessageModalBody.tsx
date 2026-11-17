"use client";

import { useMessages } from "../../hooks/useMessages";
import type { MessageRecipient } from "../../types/recipient";
import ChatPanel from "../ChatPanel/ChatPanel";
import MessageCenterView from "../MessageCenterView/MessageCenterView";

const MessageModalBody = ({ recipient }: { recipient?: MessageRecipient }) => {
  const center = useMessages(recipient);
  return recipient ? <ChatPanel center={center} className="flex h-full" showBack={false} /> : <MessageCenterView center={center} />;
};

export default MessageModalBody;
