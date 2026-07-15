import clsx from "clsx";

import { reviewComments } from "@/lib/constants/dummy";

import SearchBar from "../SearchBar/SearchBar";
import PlusIcon from "@/components/atoms/icons/PlusIcon";
import CommentCard from "../CommentCard/CommentCard";
import SeeAllBtn from "@/components/atoms/SeeAllBtn/SeeAllBtn";

const CommentWrapper = ({
  variant,
  link,
  totalComments,
  onSubmit,
  setSearch,
}: {
  variant: "small" | "large";
  link?: string;
  totalComments: number;
  onSubmit: () => void;
  setSearch: (search: string) => void;
}) => {
  const variants = {
    small: {
      parent: "py-6 px-4",
      title: "text-[#8A8D8B] text-sm",
    },
    large: {
      parent: "sm:p-10 max-sm:py-6 max-sm:px-4",
      title: "sm:text-2xl text-sm",
    },
  };

  const styles = variants[variant];

  return (
    <div className={clsx("bg-[#F6F7F9] space-y-6", styles.parent)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h6 className={clsx(styles.title, "font-semibold font-exo")}>
            {totalComments} {totalComments > 1 ? "Comments" : "Comment"}
          </h6>
          {link !== undefined && <SeeAllBtn link={link} />}
        </div>
        <div className="flex items-end justify-between sm:gap-6 gap-4 max-sm:flex-col">
          <SearchBar
            setSearch={setSearch}
            onSubmit={onSubmit}
            placeholder="Search Comments"
            variant="tertiary"
          />
          {!link && (
            <button
              type="button"
              className="flex items-center gap-2 text-[#6667FF]"
            >
              <span>
                <PlusIcon />
              </span>
              <span className=" font-exo font-semibold max-sm:text-sm">
                Add Comment
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="">
        {reviewComments?.map((review) => (
          <CommentCard
            key={review.id}
            date={review?.date}
            fullName={review?.fullName}
            rating={review?.rating}
            userId={review?.userId}
            id={review?.id}
            comment={review?.comment}
            variant="small"
            imgUrl={review?.profilePicture || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentWrapper;
