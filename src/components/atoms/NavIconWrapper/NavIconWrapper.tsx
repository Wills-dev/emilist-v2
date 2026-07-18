import Link from "next/link";

const NavIconWrapper = ({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) => {
  const element =
    href !== undefined ? (
      <Link
        href={href}
        className="px-2 py-1.25 bg-white rounded-[6px] text-[#303632] hover:bg-green-100 transition-all duration-300 sm:text-2xl text-xl flex justify-center items-center"
      >
        {children}
      </Link>
    ) : (
      <button
        type="button"
        onClick={onClick}
        className="px-2 py-1.25 bg-white rounded-[6px] hover:bg-green-100 transition-all duration-300 sm:text-2xl text-xl cursor-pointer flex justify-center items-center"
      >
        {children}
      </button>
    );
  return <>{element}</>;
};

export default NavIconWrapper;
