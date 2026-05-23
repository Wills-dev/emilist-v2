import Image from "next/image";

const SocialIconBtn = ({
  onClick,
  imgUrl,
  type,
}: {
  onClick: () => void;
  imgUrl: string;
  type: "whatsapp" | "X" | "facebook";
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center overflow-hidden">
        <Image
          src={imgUrl}
          alt={type}
          height={36}
          width={36}
          className="object-cover w-full h-full"
        />
      </div>
    </button>
  );
};

export default SocialIconBtn;
