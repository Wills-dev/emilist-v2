import Link from "next/link";
import ArrowRight from "../icons/ArrowRight";

const SeeAllBtn = ({ link }: { link: string }) => {
  return (
    <Link
      href={link}
      className="flex items-center gap-2 text-[#6667FF] text-sm hover:underline transition-all duration-300"
    >
      <span className="font-semibold font-exo">See all</span>
      <span className="">
        <ArrowRight />
      </span>
    </Link>
  );
};

export default SeeAllBtn;
