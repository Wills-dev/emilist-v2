"use client";

import ClockIcon from "@/components/atoms/icons/ClockIcon";
import LocationIcon from "@/components/atoms/icons/LocationIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import UserProfileCard from "@/components/molecules/UserProfileCard/UserProfileCard";
import DatedPosted from "@/components/atoms/DatedPosted/DatedPosted";
import ItemName from "@/components/atoms/ItemName/ItemName";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import CompareBtn from "@/components/atoms/CompareBtn/CompareBtn";

import { useToggleLike } from "../../hooks/useToggleLike";

const JobCardDetails = ({
  title,
  description,
  currency,
  price,
  location,
  projectDuration,
  noOfpplicants,
  id,
  posterId,
  isLiked,
  fullName,
  rating,
  noOfReviews,
  profileImgUrl,
  date,
  compareHref,
  reviewsHref,
}: {
  title: string;
  currency: string | null;
  description: string;
  price: number | null;
  location: string;
  projectDuration: string | null;
  noOfpplicants: number;
  id: string;
  posterId?: string;
  isLiked: boolean;
  fullName: string;
  rating: number;
  noOfReviews: number;
  profileImgUrl?: string;
  date?: string | null;
  compareHref?: string;
  reviewsHref?: string;
}) => {
  const { handleToggleLike, isLiked: displayedIsLiked, isUpdating } =
    useToggleLike({ jobId: id, initialIsLiked: isLiked });

  return (
    <div className="w-full space-y-4">
      <div className="w-full space-y-2">
        <div className="pl-2 w-full flex justify-between items-end flex-wrap">
          <div className="max-w-56.5 w-full pb-1">
            <ItemName title={title} />
            <p className="text-xs text-[#5E625F] tracking-[-3%] truncate">
              {description}
            </p>
          </div>
          {price !== null && currency ? (
            <PriceWrapper price={price} currency={currency} />
          ) : (
            <p className="whitespace-nowrap text-xs italic text-[#707471]">
              Budget not specified
            </p>
          )}
        </div>
        <div className="py-3 border-y border-[#ECECEC] w-full">
          <div className="bg-[#EDEEF0] px-2 py-0.5 w-full">
            <div className="flex items-center justify-between w-full">
              <InfoItem
                value={location}
                className="max-w-27.5 text-[#6667FF]"
                icon={<LocationIcon />}
              />
              <InfoItem
                value={projectDuration || "Timeline not specified"}
                icon={<ClockIcon />}
              />
              <div className="max-sm:hidden">
                <InfoItem
                  value={`${noOfpplicants} applicants`}
                  icon={<UserIcon />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <UserProfileCard
          id={id}
          profileId={posterId ?? ""}
          shareId={id}
          isLiked={displayedIsLiked}
          fullName={fullName}
          rating={rating}
          noOfReviews={noOfReviews}
          imgUrl={profileImgUrl}
          handleToggleLike={handleToggleLike}
          isLikeLoading={isUpdating}
          type="job"
          reviewsHref={reviewsHref}
        />
        <div className="flex items-center justify-between gap-3">
          {date ? <DatedPosted date={date} /> : <span />}
          {compareHref && <CompareBtn href={compareHref} />}
        </div>
      </div>
    </div>
  );
};

export default JobCardDetails;
