import Link from "next/link";

import clsx from "clsx";

import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import Rating from "../Rating/Rating";
import DatedPosted from "@/components/atoms/DatedPosted/DatedPosted";
import ReviewCommentActions from "@/components/atoms/ReviewCommentActions/ReviewCommentActions";

import { routes } from "@/lib/helpers/routes";

const CommentCard = ({
  variant,
  id,
  fullName,
  date,
  imgUrl,
  comment,
  userId,
  rating,
}: {
  variant: "small" | "large";
  id: string;
  fullName: string;
  date: string;
  imgUrl?: string;
  comment: string;
  userId: string;
  rating: number;
}) => {
  const variants = {
    small: "flex flex-col gap-4",
    large: "flex max-sm:flex-col sm:gap-6 gap-4",
  };

  const styles = variants[variant];
  return (
    <div className={clsx(`py-6  border-t border-[#D9D9D9]`, styles)}>
      <ProfileAvatar profileImage={imgUrl} variant={variant} />
      <div className="sm:space-y-5 space-y-2 flex-1 w-full">
        <div
          className={` flex items-center gap-4 ${variant === "small" ? "justify-between" : ""}`}
        >
          <Link
            href={routes?.profile(userId)}
            className="sm:text-xl font-exo font-semibold truncate hover:text-[#25C269] hover:underline transition-all duration-300"
          >
            {fullName}
          </Link>
          <Rating rating={rating} />
        </div>
        <p className="text-sm leading-6">{comment}</p>
        <div className="flex items-center justify-between gap-6 w-full">
          <DatedPosted date={date} />
          <ReviewCommentActions variant={variant} id={id} />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
