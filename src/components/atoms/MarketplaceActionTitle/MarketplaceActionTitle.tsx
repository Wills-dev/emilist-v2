import Link from "next/link";
import ArrowRight from "../icons/ArrowRight";

const MarketplaceActionTitle = ({
  title,
  link,
}: {
  title: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="underline flex items-center gap-1 text-[#737774] font-medium sm:text-sm text-[10px] hover:text-[#6667FF] transition-all duration-300"
    >
      <span>{title}</span>
      <span className="text-[10px]">
        <ArrowRight />
      </span>
    </Link>
  );
};

export default MarketplaceActionTitle;
