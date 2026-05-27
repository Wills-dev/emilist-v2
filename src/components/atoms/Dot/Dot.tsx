import clsx from "clsx";

const Dot = ({
  variant = "primary",
  className = "w-1.5 h-1.5",
}: {
  variant?: "primary" | "danger" | "secondary" | "default" | "purple";
  className?: string;
}) => {
  const baseStyle = "rounded-full";

  const variants = {
    primary: "bg-[#25C269]",
    danger: "bg-red-500",
    default: "bg-[#D0CFCF]",
    secondary: "bg-[#5E625F]",
    purple: "bg-[#6667FF]",
  };

  const styles = variants[variant];

  return <div className={clsx(baseStyle, styles, className)} />;
};

export default Dot;
