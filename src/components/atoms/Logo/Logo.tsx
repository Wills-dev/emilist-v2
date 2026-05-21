import Image from "next/image";
import Link from "next/link";

const Logo = ({
  src = "/assets/images/logo.svg",
  height = 37.38,
  width = 163,
  className = "max-w-40.75",
  href = "/",
}: {
  src?: string;
  height?: number;
  width?: number;
  className?: string;
  href?: string;
}) => {
  return (
    <Link href={href} className={`${className} w-full h-auto cursor-pointer`}>
      <Image
        src={src}
        alt="emilist-logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </Link>
  );
};

export default Logo;
