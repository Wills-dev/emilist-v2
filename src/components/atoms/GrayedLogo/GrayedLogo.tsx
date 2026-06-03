import Image from "next/image";

const GrayedLogo = () => {
  return (
    <div className="absolute top-0 -right-28 h-62 max-w-63.75 w-full opacity-5">
      <Image src="/assets/images/logo-small.svg" alt="logo" fill className="" />
    </div>
  );
};

export default GrayedLogo;
