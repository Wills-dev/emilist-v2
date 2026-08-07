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
    <Image src={src} alt={name} fill sizes="36px" className="object-cover" />
  </span>
);

export default MessageAvatar;
