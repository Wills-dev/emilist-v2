import PaginationControls from "@/components/atoms/PaginationControls/PaginationControls";
import ArrowBack from "@/components/atoms/icons/ArrowBack";

const PaginationPanel = ({
  page,
  totalPages,
  hasMore = false,
  onPrev,
  onNext,
  onPageChange,
  variant = "default",
}: {
  page: number;
  totalPages?: number;
  hasMore?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPageChange?: (page: number) => void;
  variant?: "default" | "centered";
}) => {
  const pages: Array<number | "ellipsis"> = (() => {
    if (!totalPages) return [page];
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (page <= 3) return [1, 2, 3, "ellipsis", totalPages];
    if (page >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
    }
    return [
      1,
      "ellipsis",
      page - 1,
      page,
      page + 1,
      "ellipsis",
      totalPages,
    ];
  })();

  if (variant === "centered") {
    return (
      <nav
        aria-label="Pagination"
        className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-[#ECECEC] pt-6"
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={page <= 1}
          aria-label="Previous page"
          className="flex size-11 items-center justify-center rounded-[8px] border border-[#E8EBF2] bg-white text-[#344054] shadow-sm transition-colors hover:border-[#6667FF] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowBack />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {pages.map((item, index) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="flex size-10 items-center justify-center text-sm text-[#667085]"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange?.(item)}
                disabled={!onPageChange || item === page}
                aria-current={item === page ? "page" : undefined}
                aria-label={`Go to page ${item}`}
                className={`flex size-11 items-center justify-center rounded-[8px] text-sm font-medium transition-colors ${
                  item === page
                    ? "border border-[#DDF7E8] bg-[#F0FDF5] text-[#010156]"
                    : "text-[#667085] hover:bg-[#F9FAFB]"
                } disabled:cursor-default`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={totalPages ? page >= totalPages : !hasMore}
          aria-label="Next page"
          className="flex size-11 rotate-180 items-center justify-center rounded-[8px] border border-[#E8EBF2] bg-white text-[#344054] shadow-sm transition-colors hover:border-[#6667FF] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowBack />
        </button>
      </nav>
    );
  }

  return (
    <div className="pt-6 border-t border-[#ECECEC] flex items-center justify-between">
      <div className="space-y-2.5">
        <p className="w-fit text-xs text-[#707471]">Page</p>
        <p className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-white border border-[#F1F2F9] text-sm font-medium text-[#010156]">
          {page}
        </p>
      </div>
      <PaginationControls
        disableNext={totalPages ? page >= totalPages : !hasMore}
        disablePrev={page <= 1}
        prev={onPrev}
        next={onNext}
      />
    </div>
  );
};

export default PaginationPanel;
