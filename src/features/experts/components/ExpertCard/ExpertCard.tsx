import DotInfoItem from "@/components/atoms/DotInfoItem/DotInfoItem";
import ItemImage from "@/components/atoms/ItemImage/ItemImage";
import ItemName from "@/components/atoms/ItemName/ItemName";
import LikeButton from "@/components/molecules/LikeButton/LikeButton";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import Rating from "@/components/molecules/Rating/Rating";
import ShareButton from "@/components/molecules/ShareButton/ShareButton";
import ExpertCardActions from "../ExpertCardActions/ExpertCardActions";

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
}) => {
  const jobType = noOfCompletedJobs < 2 ? "job" : "jobs";

  const toggleLike = () => {};

  return (
    <div className="max-w-[375.5px] w-full min-w-72.5 px-2 pt-2 pb-3 bg-[#F9F9F9] rounded-[8px]">
      <div className="space-y-4">
        <div className="p-2.5 bg-white rounded-[12px]">
          <ItemImage src={imgUrl} alt={busniessName} />
        </div>
        <div className="flex justify-between items-end  border-b border-[#ECECEC] pb-2 flex-wrap gap-2">
          <div className="space-y-1.5">
            <ItemName title={busniessName} isVerified={isVerified} />
            <div className="flex items-center gap-[6.88px]">
              <Rating rating={rating} />{" "}
              <span className="block text-[9.45px] font-exo">
                ({noOfReviews} reviews)
              </span>
            </div>
          </div>
          <PriceWrapper price={price} currency={currency} unit={period} />
        </div>
        <div className="flex justify-between gap-4 flex-wrap">
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
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton id={id} type="expert" name={busniessName} />
            <LikeButton isLiked={isLiked} onToggleLike={toggleLike} />
          </div>
        </div>
        <ExpertCardActions expertId={id} />
      </div>
    </div>
  );
};

export default ExpertCard;
