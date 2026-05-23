import { clsx } from "clsx";

const SquareTab = ({
  color,
  className = "",
}: {
  color: "white" | "gray";
  className?: string;
}) => {
  const variants = {
    white: "w-full h-full",
    gray: "bg-[#999999] w-full h-full",
  };
  const bgColor = variants[color];
  return (
    <div className="w-1/2 h-1/2 p-[0.5px]">
      <div className={clsx(className, bgColor)} />
    </div>
  );
};

export default SquareTab;
