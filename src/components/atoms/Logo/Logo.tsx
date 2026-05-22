import Image from "next/image";
import Link from "next/link";

const Logo = ({
  src = "/assets/images/logo.svg",
  height = 37.38,
  width = 163,
  className = "max-w-40.75 w-full min-w-30 h-[37.38px]",
  href = "/",
}) => {
  return (
    <Link href={href} className={`block ${className}`}>
      <Image
        src={src}
        alt="emilist-logo"
        width={width}
        height={height}
        priority
        className="object-contain w-auto h-auto"
      />
    </Link>
  );
};

export default Logo;
