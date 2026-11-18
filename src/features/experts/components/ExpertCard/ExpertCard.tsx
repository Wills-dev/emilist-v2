"use client";

import { useResourceTracking } from "@/features/reports/hooks/useResourceTracking";
import DotInfoItem from "@/components/atoms/DotInfoItem/DotInfoItem";
import ItemImage from "@/components/atoms/ItemImage/ItemImage";
import ItemName from "@/components/atoms/ItemName/ItemName";
import BusinessLikeButton from "@/features/businesses/components/BusinessLikeButton/BusinessLikeButton";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import Rating from "@/components/molecules/Rating/Rating";
import ShareButton from "@/components/molecules/ShareButton/ShareButton";
import ExpertCardActions from "../ExpertCardActions/ExpertCardActions";
import CompareBtn from "@/components/atoms/CompareBtn/CompareBtn";
import Link from "next/link";

const ExpertCard = ({
  id,
  imgUrl,
  busniessName,
  isVerified,
  rating,
  noOfReviews,
  price,
  period,
  currency,
  location,
  noOfCompletedJobs,
  serviceType,
  level,
  isLiked,
  profileHref,
  compareHref,
  reviewsHref,
}: {
  id: string;
  imgUrl: string;
  busniessName: string;
  isVerified: boolean;
  rating: number;
  noOfReviews: number;
  price: number;
  period: string;
  currency: string;
  location: string;
  noOfCompletedJobs: number;
  serviceType: string;
  level: string;
  isLiked: boolean;
  profileHref?: string;
  compareHref?: string;
  reviewsHref?: string;
}) => {
  const { ref: impressionRef, click: trackClick } = useResourceTracking({ resourceType: "business", resourceId: id });
  const jobType = noOfCompletedJobs < 2 ? "job" : "jobs";


  return (
    <div ref={impressionRef} onClickCapture={trackClick} className="h-full w-full min-w-0 max-w-[375.5px] shrink-0 px-2 pt-2 pb-3 bg-[#F9F9F9] rounded-[8px]">
      <div className="flex h-full flex-col gap-4">
        <div className="p-2.5 bg-white rounded-[12px]">
          <ItemImage src={imgUrl} alt={busniessName} />
        </div>
        <div className="flex min-h-22 flex-col items-start justify-between gap-2 border-b border-[#ECECEC] pb-2">
          <div className="w-full min-w-0 space-y-1.5">
            <ItemName title={busniessName} isVerified={isVerified} />
            <div className="flex items-center gap-[6.88px]">
              <Rating rating={rating} />{" "}
              {reviewsHref ? (
                <Link
                  href={reviewsHref}
                  className="block text-[9.45px] font-exo underline underline-offset-2 transition-colors hover:text-[#009F4D]"
                >
                  ({noOfReviews} {noOfReviews === 1 ? "review" : "reviews"})
                </Link>
              ) : (
                <span className="block text-[9.45px] font-exo">
                  ({noOfReviews} {noOfReviews === 1 ? "review" : "reviews"})
                </span>
              )}
            </div>
          </div>
          <PriceWrapper price={price} currency={currency} unit={period} />
        </div>
        <div className="flex min-h-32 flex-wrap items-start justify-between gap-4">
          <div className="max-w-56.25 w-full bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB] sm:p-3 p-1.5 border border-[#F1F2F9] rounded-[8px]">
            <div className="space-y-2.5">
              <div className="flex items-center gap-4">
                <DotInfoItem
                  desc={serviceType}
                  variant="purple"
                  className="max-w-20"
                />
                <DotInfoItem
                  desc={`${noOfCompletedJobs} ${jobType} completed`}
                  variant="secondary"
                />
              </div>
              <div className="flex items-center gap-4">
                <DotInfoItem
                  desc={location}
                  variant="secondary"
                  className="max-w-30"
                />
                <DotInfoItem desc={level} variant="secondary" />
              </div>
              {compareHref && <CompareBtn type="expert" item={{ id, name: busniessName }} />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton id={id} type="expert" name={busniessName} />
            <BusinessLikeButton businessId={id} liked={isLiked} />
          </div>
        </div>
        <div className="mt-auto"><ExpertCardActions expertId={id} profileHref={profileHref} /></div>
      </div>
    </div>
  );
};

export default ExpertCard;
