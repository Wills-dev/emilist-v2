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
  isLikeLoading = false,
  detail,
  reviewsHref,
  profileId,
  shareId,
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
  isLikeLoading?: boolean;
  detail?: string;
  reviewsHref?: string;
  profileId?: string;
  shareId?: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 pl-2">
      <UserRatingCard
        id={profileId ?? id}
        imgUrl={imgUrl}
        fullName={fullName}
        rating={rating}
        noOfReviews={noOfReviews}
        detail={detail}
        reviewsHref={reviewsHref}
      />
      <div className="flex items-center gap-2">
        <ShareButton id={shareId ?? id} type={type} name={title || fullName} />
        <LikeButton
          isLiked={isLiked}
          onToggleLike={handleToggleLike}
          isLoading={isLikeLoading}
        />
      </div>
    </div>
  );
};

export default UserProfileCard;
