import clsx from "clsx";

import { Review } from "@/lib/types/review";

import SearchBar from "../SearchBar/SearchBar";
import PlusIcon from "@/components/atoms/icons/PlusIcon";
import CommentCard from "../CommentCard/CommentCard";
import SeeAllBtn from "@/components/atoms/SeeAllBtn/SeeAllBtn";
import PaginationPanel from "../PaginationPanel/PaginationPanel";
import EmptyState from "../EmptyState/EmptyState";

const CommentWrapper = ({
  variant,
  link,
  totalComments = 0,
  onSubmit,
  setSearch,
  reviews = [],
  pagination,
  onAddComment,
  canAddComment = true,
}: {
  variant: "small" | "large";
  link?: string;
  totalComments?: number;
  onSubmit: () => void;
  setSearch: (search: string) => void;
  reviews?: Review[];
  pagination?: {
    page: number;
    hasMore?: boolean;
    onNext: () => void;
    onPrev: () => void;
  };
  onAddComment?: () => void;
  canAddComment?: boolean;
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
          {!link && canAddComment && (
            <button
              type="button"
              onClick={onAddComment}
              className="flex items-center gap-2 text-[#6667FF] cursor-pointer"
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
        {reviews.length === 0 ? (
          <EmptyState
            title="No reviews yet"
            description="Be the first to share your experience with this material."
            className="min-h-48 bg-white"
          />
        ) : (
          <>
            {reviews.map((review) => (
              <CommentCard
                key={review?._id ?? `${review?.createdAt}-${review?.comment}`}
                date={review?.createdAt ?? ""}
                fullName={
                  [review?.user?.firstName, review?.user?.lastName]
                    .filter(Boolean)
                    .join(" ") || "Anonymous"
                }
                rating={review?.rating ?? 0}
                userId={review?.user?._id ?? ""}
                id={review?._id ?? ""}
                comment={review?.comment ?? ""}
                variant={variant}
                imgUrl={review?.user?.displayImage}
              />
            ))}
            {pagination && (pagination.page > 1 || pagination.hasMore) && (
              <PaginationPanel
                page={pagination.page}
                hasMore={pagination.hasMore}
                onNext={pagination.onNext}
                onPrev={pagination.onPrev}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentWrapper;
