import Link from "next/link";

const SeeMoreBtn = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="text-[#6667FF] flex items-center gap-1 hover:text-purple-600 duration-300 transition-all ease-out font-medium max-sm:text-xs underline whitespace-nowrap"
    >
      {title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-[1em] h-[1em]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </Link>
  );
};

export default SeeMoreBtn;
