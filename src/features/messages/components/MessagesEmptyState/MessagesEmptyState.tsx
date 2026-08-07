import Image from "next/image";

const MessagesEmptyState = () => (
  <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center bg-white px-4 py-16 text-center">
    <Image
      src="/assets/images/Message-emptystate.svg"
      alt="No messages received"
      width={192}
      height={164}
      priority
      className="h-auto w-40 sm:w-48"
    />
    <p className="mt-4 font-exo text-sm text-[#737774]">No messages received</p>
  </div>
);

export default MessagesEmptyState;
