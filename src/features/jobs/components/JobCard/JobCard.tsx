import JobCardActions from "../JobCardActions/JobCardActions";
import JobCardDetails from "../JobCardDetails/JobCardDetails";
import JobCategory from "../JobCategory/JobCategory";
import JobImagePreview from "../JobImagePreview/JobImagePreview";

export interface JobCardProps {
  id: string;
  posterId?: string;
  category: string;
  title: string;
  description: string;
  price: number | null;
  currency: string | null;
  location: string;
  projectDuration: string | null;
  applicants: number;
  isLiked: boolean;
  fullName: string;
  rating: number;
  reviews: number;
  profileImgUrl?: string;
  imageUrl?: string;
  date?: string | null;
  detailsHref?: string;
  compareHref?: string;
  reviewsHref?: string;
}

const JobCard = ({
  id,
  posterId,
  category,
  title,
  description,
  price,
  currency,
  location,
  projectDuration,
  applicants,
  isLiked,
  fullName,
  rating,
  reviews,
  profileImgUrl,
  imageUrl,
  date,
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
        currency={currency}
        price={price}
        description={description}
        location={location}
        projectDuration={projectDuration}
        noOfpplicants={applicants}
        id={id}
        posterId={posterId}
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
