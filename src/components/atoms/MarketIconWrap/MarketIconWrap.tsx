const MarketIconWrap = ({
  className = "sm:w-[66.82px] w-[28.28px] sm:h-[66.82px] h-[28.28px] sm:text-2xl text-sm",
  icon,
}: {
  className?: string;
  icon: React.ReactElement;
}) => {
  return (
    <span
      className={`border-[#18A154] border bg-[#0F381B] rounded-full flex justify-center items-center ${className}`}
    >
      {icon}
    </span>
  );
};

export default MarketIconWrap;
