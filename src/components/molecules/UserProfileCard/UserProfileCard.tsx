import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import Rating from "../Rating/Rating";
import ShareButton from "../ShareButton/ShareButton";
import LikeButton from "../LikeButton/LikeButton";

const UserProfileCard = ({
  id,
  isLiked,
  fullName,
  rating,
  noOfReviews,
  imgUrl,
  title,
  type,
  handleToggleLike,
}: {
  id: string;
  isLiked: boolean;
  fullName: string;
  rating: number;
  noOfReviews: number;
  imgUrl?: string;
  title?: string;
  type: "user" | "expert" | "job" | "material";
  handleToggleLike: () => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 pl-2">
      <div className="flex items-center gap-2">
        <ProfileAvatar profileImage={imgUrl} />
        <div className="space-y-1">
          <p className="text-[#5E625F] text-sm font-exo font-semibold truncate">
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
      <div className="flex items-center gap-2">
        <ShareButton id={id} type={type} name={title || fullName} />
        <LikeButton isLiked={isLiked} onToggleLike={handleToggleLike} />
      </div>
    </div>
  );
};

export default UserProfileCard;
