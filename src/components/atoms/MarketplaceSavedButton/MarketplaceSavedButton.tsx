import Link from "next/link";

import LikeIcon from "../icons/LikeIcon";

const MarketplaceSavedButton = ({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) => (
  <Link
    href={href}
    aria-label={label}
    aria-current={active ? "page" : undefined}
    className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#F6F7F9] transition-colors hover:text-[#FF5D7A] ${active ? "text-[#FF5D7A]" : "text-[#737774]"}`}
  >
    <LikeIcon />
  </Link>
);

export default MarketplaceSavedButton;
