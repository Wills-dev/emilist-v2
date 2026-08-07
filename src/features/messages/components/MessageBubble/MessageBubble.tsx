import { ChatMessage } from "../../types";

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isCurrentUser = message.sender === "current-user";

  return (
    <div
      className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-5 sm:max-w-[62%] ${
          isCurrentUser
            ? "rounded-br-xs bg-[#DDF8E8] text-[#39704F]"
            : "rounded-bl-xs bg-[#EFEFEF] text-[#303632]"
        }`}
      >
        {message.text}
      </div>
      <span className="mt-1 text-[10px] text-[#8A8D8B]">
        {isCurrentUser && message.status === "read" ? "Read" : "Sent"} at{" "}
        {message.time}
      </span>
    </div>
  );
};

export default MessageBubble;
