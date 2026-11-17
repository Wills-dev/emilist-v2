import Image from "next/image";

const MessagesEmptyState = ({ conversation = false, pageEmpty = false }: { conversation?: boolean; pageEmpty?: boolean }) => (
  <div className={`flex flex-col items-center justify-center bg-white px-4 text-center ${conversation ? "min-h-48 py-6" : pageEmpty ? "min-h-[calc(100vh-7rem)] py-16" : "h-full min-h-0 py-16"}`}>
    <Image
      src="/assets/images/Message-emptystate.svg"
      alt=""
      width={192}
      height={164}
      preload
      className={conversation ? "h-auto w-24 sm:w-32" : "h-auto w-40 sm:w-48"}
    />
    <p className="mt-4 font-exo text-sm text-[#737774]">{conversation ? "Send your first message to start the conversation." : pageEmpty ? "No messages received" : "Select a conversation to start messaging"}</p>
  </div>
);

export default MessagesEmptyState;
