import clsx from "clsx";
import Image from "next/image";

const GrayedLogo = ({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) => {
  const variants = {
    primary: "-top-10 -right-14 rotate-[27.46deg] h-62 max-w-63.75  opacity-5",
    secondary:
      "max-w-152.5 sm:h-152 h-130 -rotate-[40deg] -top-20 -left-48 opacity-10 backdrop-blur-xl",
  };

  const styles = variants[variant];

  return (
    <div className={clsx("absolute   w-full", styles)}>
      <Image src="/assets/images/logo-small.svg" alt="logo" fill className="" />
    </div>
  );
};

export default GrayedLogo;
