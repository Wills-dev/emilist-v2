import Dot from "@/components/atoms/Dot/Dot";

const JobCategory = ({ category }: { category: string }) => {
  return (
    <div className="flex items-center gap-1 pl-2 pr-3 bg-white rounded-[32px] w-fit">
      <Dot />
      <p className="text-xs font-semibold text-[#737774]">{category}</p>
    </div>
  );
};

export default JobCategory;
