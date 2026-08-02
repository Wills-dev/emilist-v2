import JobCardActions from "../JobCardActions/JobCardActions";
import JobCardDetails from "../JobCardDetails/JobCardDetails";
import JobCategory from "../JobCategory/JobCategory";
import JobImagePreview from "../JobImagePreview/JobImagePreview";
import { dashboardJobs, jobInfoFixture } from "../../constants/dummy";

const defaultJob = dashboardJobs[0];

export interface JobCardProps {
  id?: string;
  category?: string;
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  projectDuration?: string;
  applicants?: number;
  isLiked?: boolean;
  fullName?: string;
  rating?: number;
  reviews?: number;
  profileImgUrl?: string;
  imageUrl?: string;
  date?: string;
  detailsHref?: string;
  compareHref?: string;
  reviewsHref?: string;
}

const JobCard = ({
  id = defaultJob.id,
  category = defaultJob.category,
  title = defaultJob.title,
  description = defaultJob.description,
  price = defaultJob.price,
  location = defaultJob.location,
  projectDuration = defaultJob.projectDuration,
  applicants = defaultJob.applicants,
  isLiked = defaultJob.isLiked,
  fullName = defaultJob.fullName,
  rating = defaultJob.rating,
  reviews = defaultJob.reviews,
  profileImgUrl,
  imageUrl,
  date = defaultJob.date ?? jobInfoFixture.createdAt,
  detailsHref,
  compareHref,
  reviewsHref,
}: JobCardProps) => {
  return (
    <div className="max-w-[375.5px] w-full sm:min-w-[375.5px] min-w-75 p-4 bg-[#F9F9F9] rounded-[8px] space-y-8">
      <div className="pb-2.5 border-b border-[#ECECEC] flex items-end justify-between">
        <JobCategory category={category} />
        <JobImagePreview imgUrl={imageUrl} />
      </div>
      <JobCardDetails
        title={title}
        currency="NGN"
        price={price}
        description={description}
        location={location}
        projectDuration={projectDuration}
        noOfpplicants={applicants}
        id={id}
        isLiked={isLiked}
        fullName={fullName}
        rating={rating}
        noOfReviews={reviews}
        profileImgUrl={profileImgUrl}
        date={date}
        compareHref={compareHref}
        reviewsHref={reviewsHref}
      />
      <JobCardActions jobId={id} detailsHref={detailsHref} />
    </div>
  );
};

export default JobCard;
