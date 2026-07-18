import ShareButton from "../ShareButton/ShareButton";
import LikeButton from "../LikeButton/LikeButton";
import UserRatingCard from "../UserRatingCard/UserRatingCard";

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
      <UserRatingCard
        id={id}
        imgUrl={imgUrl}
        fullName={fullName}
        rating={rating}
        noOfReviews={noOfReviews}
      />
      <div className="flex items-center gap-2">
        <ShareButton id={id} type={type} name={title || fullName} />
        <LikeButton isLiked={isLiked} onToggleLike={handleToggleLike} />
      </div>
    </div>
  );
};

export default UserProfileCard;
