import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import Rating from "../Rating/Rating";

const UserRatingCard = ({
  fullName,
  rating,
  noOfReviews,
  imgUrl,
}: {
  fullName: string;
  rating: number;
  noOfReviews: number;
  imgUrl?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <ProfileAvatar profileImage={imgUrl} />
      <div className="space-y-1">
        <p className="text-[#5E625F] text-sm font-exo font-semibold truncate">
          {fullName}
        </p>
        <div className="flex items-center gap-[6.88px]">
          <Rating rating={rating} />{" "}
          <span className="block text-[9.45px] font-exo">({noOfReviews})</span>
        </div>
      </div>
    </div>
  );
};

export default UserRatingCard;
