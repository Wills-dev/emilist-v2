import { memo } from "react";

const IconWrapper = memo(function IconWrapper({
  onClick,
  children,
  className = "text-sm",
  textColor = "text-[#737774]",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  textColor?: string;
}) {
  return (
    <button
      type="button"
      className={`bg-[#EDEEF0] px-2 py-1.5 rounded-[6px] cursor-pointer ${textColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default IconWrapper;
