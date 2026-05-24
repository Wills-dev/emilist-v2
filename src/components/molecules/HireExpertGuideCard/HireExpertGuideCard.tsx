const HireExpertGuideCard = ({
  index,
  title,
  icon,
  desc,
}: {
  index: number;
  title: string;
  icon: React.ReactElement;
  desc: string;
}) => {
  return (
    <div className="max-w-100 w-full min-w-75 sm:px-6 px-2 pt-6 pb-10 rounded-[16px] border border-[#F1F2F9]">
      <div className="flex items-center justify-between flex-col sm:gap-10 gap-6">
        <div className="w-5.75 h-5.75 flex justify-center items-center rounded-full bg-[#F4F7F5]">
          <span className="font-semibold sm:text-sm text-xs tracking-[-2%]">
            {index}
          </span>
        </div>
        <div className="w-22 h-22 rounded-full bg-linear-to-b from-0% from-[#25C269] to-100% to-[#125C32] flex justify-center items-center">
          {icon}
        </div>
        <div className="space-y-4">
          <h6 className="text-center text-[#18A154] sm:text-[24px] text-lg font-exo font-semibold">
            {title}
          </h6>
          <p className="text-center tracking[-3%] sm:text-sm text-xs font-medium text-black leading-6">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HireExpertGuideCard;
