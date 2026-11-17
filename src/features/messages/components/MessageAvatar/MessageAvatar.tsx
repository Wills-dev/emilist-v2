import Image from "next/image";

const MessageAvatar = ({
  src,
  name,
  size = "default",
}: {
  src: string;
  name: string;
  size?: "small" | "default";
}) => (
  <span
    className={`relative block shrink-0 overflow-hidden rounded-full bg-[#E8EBE9] ${
      size === "small" ? "size-6" : "size-9"
    }`}
  >
    {src ? <Image unoptimized src={src} alt={name} fill sizes="36px" className="object-cover" /> : <span className="flex h-full items-center justify-center text-sm font-medium text-[#39704F]">{name.charAt(0).toUpperCase()}</span>}
  </span>
);

export default MessageAvatar;
