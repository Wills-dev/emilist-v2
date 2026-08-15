import type { JobCardViewModel } from "../../types/listJobs";
import JobCard from "../JobCard/JobCard";

const JobCardItem = ({
  job,
  detailsHref,
  compareHref,
  reviewsHref,
}: {
  job: JobCardViewModel;
  detailsHref: string;
  compareHref?: string;
  reviewsHref?: string;
}) => (
  <JobCard
    id={job.id}
    posterId={job.posterId}
    category={job.category}
    title={job.title}
    description={job.description}
    price={job.budgetAmount}
    currency={job.currency}
    location={job.location}
    projectDuration={job.timeline}
    applicants={job.applicants}
    isLiked={job.isLiked}
    fullName={job.posterName}
    rating={job.posterRating}
    reviews={job.posterReviewCount}
    profileImgUrl={job.posterProfileImage ?? undefined}
    imageUrl={job.imageUrl ?? undefined}
    date={job.createdAt}
    detailsHref={detailsHref}
    compareHref={compareHref}
    reviewsHref={reviewsHref}
  />
);

export default JobCardItem;
