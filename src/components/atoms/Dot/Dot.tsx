import clsx from "clsx";

const Dot = ({
  variant = "primary",
}: {
  variant?: "primary" | "danger" | "secondary" | "default";
}) => {
  const baseStyle = "w-1.5 h-1.5 rounded-full";

  const variants = {
    primary: "bg-[#25C269]",
    danger: "bg-red-500",
    default: "bg-gray-400",
    secondary: "bg-yellow-500",
  };

  const styles = variants[variant];

  return <div className={clsx(baseStyle, styles)} />;
};

export default Dot;
