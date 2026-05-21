import Image from "next/image";
import Link from "next/link";

const Logo = ({
  src = "/assets/images/logo.svg",
  height = 37.38,
  width = 163,
  className = "max-w-40.75 w-full min-w-30",
  href = "/",
}) => {
  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      <Image
        src={src}
        alt="emilist-logo"
        width={width}
        height={height}
        priority
        className="w-full h-auto"
      />
    </Link>
  );
};

export default Logo;
