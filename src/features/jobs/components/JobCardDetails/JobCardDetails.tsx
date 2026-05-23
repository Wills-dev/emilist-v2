"use client";

import ClockIcon from "@/components/atoms/icons/ClockIcon";
import LocationIcon from "@/components/atoms/icons/LocationIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import Price from "@/components/atoms/Price/Price";
import UserProfileCard from "@/components/molecules/UserProfileCard/UserProfileCard";

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
  isLiked,
  fullName,
  rating,
  noOfReviews,
  imgUrl,
}: {
  title: string;
  currency: string;
  description: string;
  price: number;
  location: string;
  projectDuration: string;
  noOfpplicants: number;
  id: string;
  isLiked: boolean;
  fullName: string;
  rating: number;
  noOfReviews: number;
  imgUrl?: string;
}) => {
  const { handleToggleLike } = useToggleLike();

  const toggleLike = () => {
    handleToggleLike(id);
  };

  return (
    <div className="w-full space-y-4">
      <div className="w-full space-y-2">
        <div className="pl-2 w-full flex justify-between items-end flex-wrap">
          <div className="max-w-56.5 w-full pb-1">
            <h6 className="font-exo font-semibold w-full truncate">{title}</h6>
            <p className="text-xs text-[#5E625F] tracking-[-3%] truncate">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="block text-[#707471] italic text-xs">from</span>
            <Price price={price} currency={currency} />
          </div>
        </div>
        <div className="py-3 border-y border-[#ECECEC] w-full">
          <div className="bg-[#EDEEF0] px-2 py-0.5 w-full">
            <div className="flex items-center justify-between w-full">
              <InfoItem
                value={location}
                className="max-w-27.5 text-[#6667FF]"
                icon={<LocationIcon />}
              />
              <InfoItem value={projectDuration} icon={<ClockIcon />} />
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
      <UserProfileCard
        id={id}
        isLiked={isLiked}
        fullName={fullName}
        rating={rating}
        noOfReviews={noOfReviews}
        imgUrl={imgUrl}
        handleToggleLike={toggleLike}
        type="job"
      />
    </div>
  );
};

export default JobCardDetails;
