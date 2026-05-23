import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import Rating from "../Rating/Rating";

const UserProfileCard = ({
  id,
  isLiked,
  fullName,
  rating,
  noOfReviews,
  imgUrl,
}: {
  id: string;
  isLiked: boolean;
  fullName: string;
  rating: number;
  noOfReviews: number;
  imgUrl?: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 pl-2">
      <div className="flex items-center gap-2">
        <ProfileAvatar profileImage={imgUrl} />
        <div className="space-y-1">
          <p className="text-[#5E625F] text-sm font-exo font-semibold">
            {fullName}
          </p>
          <div className="flex items-center gap-[6.88px]">
            <Rating rating={rating} />{" "}
            <span className="block text-[9.45px] font-exo">
              ({noOfReviews})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
