import Link from "next/link";

const SeeMoreBtn = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="text-[#6667FF] hover:text-purple-600 duration-300 transition-all ease-out font-medium max-sm:text-xs underline whitespace-nowrap"
    >
      {title} →
    </Link>
  );
};

export default SeeMoreBtn;
