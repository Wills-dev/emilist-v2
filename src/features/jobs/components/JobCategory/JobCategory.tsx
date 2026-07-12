import Dot from "@/components/atoms/Dot/Dot";
import clsx from "clsx";

const JobCategory = ({
  category,
  variant = "primary",
}: {
  category: string;
  variant?: "primary" | "secondary";
}) => {
  const variants = {
    primary: "pl-2 pr-3",
    secondary: "py-2 px-3",
  };

  const styles = variants[variant];

  return (
    <div
      className={clsx(
        styles,
        "flex items-center gap-1 bg-white rounded-[32px] w-fit",
      )}
    >
      <Dot />
      <p className="text-xs font-semibold text-[#737774]">{category}</p>
    </div>
  );
};

export default JobCategory;
