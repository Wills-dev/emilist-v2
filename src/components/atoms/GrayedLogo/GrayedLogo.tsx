import clsx from "clsx";
import Image from "next/image";

const GrayedLogo = ({
  variant = "primary",
}: {
  variant?: "primary" | "secondary" | "message";
}) => {
  const variants = {
    primary: "-top-10 -right-14 rotate-[27.46deg] h-62 max-w-63.75  opacity-5",
    secondary:
      "max-w-152.5 sm:h-152 h-130 -rotate-[40deg] -top-20 -left-48 opacity-10 backdrop-blur-xl",
    message:
      "pointer-events-none left-1/2 top-1/2 h-60 max-w-60 -translate-x-1/2 -translate-y-1/2 opacity-[0.035] blur-[4px]",
  };

  const styles = variants[variant];

  return (
    <div className={clsx("absolute w-full", styles)} aria-hidden="true">
      <Image src="/assets/images/logo-small.svg" alt="" fill />
    </div>
  );
};

export default GrayedLogo;
