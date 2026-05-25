import Link from "next/link";

import Dot from "@/components/atoms/Dot/Dot";
import ArrowUp from "@/components/atoms/icons/ArrowUp";

const CustomerServiceCard = ({
  href,
  title,
}: {
  href: string;
  title: string;
}) => {
  return (
    <Link
      href={href}
      className="sm:p-6 px-2 sm:h-22 rounded-[8px] w-full hover:bg-linear-to-b from-0% from-[#25C269] to-100% to-[#125C32] transition-all duration-300 flex items-center group"
    >
      <div className="flex items-center justify-between gap-2.5 w-full">
        <div className="flex items-center gap-2.5">
          <Dot
            variant="default"
            className="w-2.5 h-2.5 group-hover:bg-[#25C269] transition-colors duration-200"
          />
          <p className="font-exo tracking-[-3%] leading-6 font-medium text-[#474C48] group-hover:text-white transition-colors duration-200">
            {title}
          </p>
        </div>
        <div className="text-[24px] group-hover:text-[28px] text-[#A2A4A2] group-hover:text-white transition-all duration-200">
          <ArrowUp />
        </div>
      </div>
    </Link>
  );
};

export default CustomerServiceCard;
