import Image from "next/image";
import Link from "next/link";

const HeroSeviceItem = ({
  desc,
  icon,
  title,
  imgUrl,
  href,
}: {
  desc: string;
  title: string;
  href: string;
  imgUrl: string;
  icon: React.ReactElement;
}) => {
  return (
    <div className="max-w-100 font-exo font-semibold  w-full min-w-75 sm:h-80 h-55 overflow-hidden bg-[#F4F7F5] rounded-[24px] flex">
      <div className="flex-1 w-full p-5.5 flex flex-col justify-between h-full">
        <div className="">{icon}</div>
        <div className="space-y-6.25">
          <p className="md:text-[20px]">{desc}</p>
          <Link
            href={href}
            className="flex items-center gap-2 text-[#18A154] hover:underline transition-all duration-300 ease-out"
          >
            {title}
            <span className="block">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[1em] h-[1em]"
              >
                <path
                  d="M4.44531 10.7935L10.7945 4.44434M10.7945 10.7935V4.44434H4.44531"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
      <div className="sm:max-w-44.5 max-w-30 w-full h-full bg-gray-500">
        <Image
          src={imgUrl}
          alt={title}
          width={178}
          height={320}
          placeholder="blur"
          blurDataURL={imgUrl}
        />
      </div>
    </div>
  );
};

export default HeroSeviceItem;
