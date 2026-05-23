import JobCardActions from "../JobCardActions/JobCardActions";
import JobCardDetails from "../JobCardDetails/JobCardDetails";
import JobCategory from "../JobCategory/JobCategory";
import JobImagePreview from "../JobImagePreview/JobImagePreview";

const JobCard = () => {
  return (
    <div className="max-w-[375.5px] w-full sm:min-w-[375.5px] min-w-75 p-4 bg-[#F9F9F9] rounded-[8px] space-y-8">
      <div className="pb-2.5 border-b border-[#ECECEC] flex items-end justify-between">
        <JobCategory category="Carpentry" />
        <JobImagePreview imgUrl="" />
      </div>
      <JobCardDetails
        title="Home Furniture Upgrade"
        currency="NGN"
        price={4500000}
        description="Remake old chairs, cabinets, beds & doors"
        location="Gbagada Phase 1"
        projectDuration="3 weeks"
        noOfpplicants={10}
        id="1"
        isLiked={false}
        fullName="Arthur Phillips"
        rating={4}
        noOfReviews={51}
        profileImgUrl=""
        date="2026-05-19T14:32:10.123Z"
      />
      <JobCardActions jobId={"1"} />
    </div>
  );
};

export default JobCard;
