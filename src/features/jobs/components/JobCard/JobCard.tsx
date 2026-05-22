import JobCategory from "../JobCategory/JobCategory";

const JobCard = () => {
  return (
    <div className="max-w-[375.5px] w-full min-w-75 p-4 bg-[#F9F9F9] rounded-[8px]">
      <div className="pb-2.5 border-b border-[#ECECEC] flex items-end justify-between">
        <JobCategory category="Carpentry" />
      </div>
    </div>
  );
};

export default JobCard;
