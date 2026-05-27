import Dot from "../Dot/Dot";
import clsx from "clsx";

const DotInfoItem = ({
  variant = "secondary",
  desc,
  className = "",
}: {
  variant?: "purple" | "secondary";
  desc: string;
  className?: string;
}) => {
  const variants = {
    purple: "text-[#6667FF]",
    secondary: "text-[#5E625F]",
  };
  const styles = variants[variant];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Dot variant={variant} className="w-1 h-1 min-w-1" />
      <p
        className={clsx(
          "text-xs tracking-[-3%] leading-[22.7px] truncate",
          styles,
        )}
      >
        {desc}
      </p>
    </div>
  );
};

export default DotInfoItem;
