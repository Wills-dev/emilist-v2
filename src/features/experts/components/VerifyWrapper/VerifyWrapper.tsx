import Image from "next/image";

import AddMoreBtn from "@/components/atoms/AddMoreBtn/AddMoreBtn";

const VerifyWrapper = ({
  iconUrl,
  title,
  desc,
  onClick,
}: {
  iconUrl: string;
  title: string;
  desc: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex justify-between items-center gap-10 pb-12 border-b border-[#E5E5E5]">
      <div className="space-y-6">
        <h6 className="text-[#030A05] sm:text-xl text-lg font-exo font-semibold">
          {title}{" "}
          <span className="max-sm:text-sm text-[#737774]">(optional)</span>
        </h6>
        <p className="max-sm:text-sm text-[#737774]">{desc}</p>
        <AddMoreBtn onClick={onClick} />
      </div>
      <div className="bg-[#F4F7F5] w-13 h-13 flex justify-center items-center">
        <Image
          src={iconUrl}
          alt={title}
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default VerifyWrapper;
