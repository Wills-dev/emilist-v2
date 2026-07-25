import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import Rating from "../Rating/Rating";
import Link from "next/link";

import { routes } from "@/lib/helpers/routes";

const UserRatingCard = ({
  id,
  fullName,
  rating,
  noOfReviews,
  imgUrl,
  detail,
}: {
  id: string;
  fullName: string;
  rating: number;
  noOfReviews?: number;
  imgUrl?: string;
  detail?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <ProfileAvatar profileImage={imgUrl} />
      <div className="space-y-1">
        <Link
          href={routes?.profile(id)}
          className="text-[#5E625F] text-sm font-exo font-semibold truncate hover:underline duration-300 transition-all"
        >
          {fullName}
        </Link>
        {detail && (
          <p className="max-w-44 truncate text-[11px] text-[#8A8D8B]">
            {detail}
          </p>
        )}
        <div className="flex items-center gap-[6.88px]">
          <Rating rating={rating} />{" "}
          {noOfReviews && (
            <span className="block text-[9.45px] font-exo">
              ({noOfReviews})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRatingCard;
