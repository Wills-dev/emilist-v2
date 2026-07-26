import { ReactNode } from "react";
import clsx from "clsx";

const DashboardTitle = ({
  title,
  icon,
  size = "large",
  className,
}: {
  title: string;
  icon?: ReactNode;
  size?: "large" | "medium";
  className?: string;
}) => (
  <div className={clsx("flex items-center gap-4", className)}>
    {icon && (
      <div className="flex size-9.75 shrink-0 items-center justify-center rounded-full bg-[#F6F7F9] text-xl shadow-[inset_0px_1.83px_5.89px_0px_#00000014]">
        {icon}
      </div>
    )}
    <h1
      className={clsx(
        "font-exo font-semibold",
        size === "large"
          ? "text-2xl sm:text-[32px]"
          : "text-lg leading-10 sm:text-2xl",
      )}
    >
      {title}
    </h1>
  </div>
);

export default DashboardTitle;
