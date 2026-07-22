import { memo } from "react";

const IconWrapper = memo(function IconWrapper({
  onClick,
  children,
  className = "text-sm px-2 py-1.5",
  textColor = "text-[#737774]",
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={`bg-[#EDEEF0] rounded-[6px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${textColor} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export default IconWrapper;
