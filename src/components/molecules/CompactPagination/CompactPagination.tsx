import { ArrowLeft, ArrowRight } from "lucide-react";

const CompactPagination = ({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) => {
  const pages: Array<number | "ellipsis"> =
    totalPages <= 7
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : page <= 3
        ? [1, 2, 3, "ellipsis", totalPages - 2, totalPages - 1, totalPages]
        : page >= totalPages - 2
          ? [1, 2, 3, "ellipsis", totalPages - 2, totalPages - 1, totalPages]
          : [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];

  return (
    <nav
      aria-label="Transaction pages"
      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-[#E9EDEB] px-4 py-3"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-2 rounded-lg border border-[#E5E7E6] px-3 py-2 text-xs disabled:opacity-40"
      >
        <ArrowLeft className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      <div className="flex items-center justify-center gap-1">
        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-2 text-xs">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-current={item === page ? "page" : undefined}
              className={`size-9 rounded-lg text-xs ${
                item === page ? "bg-[#F0FDF5] text-[#07883E]" : "text-[#667085]"
              }`}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-2 rounded-lg border border-[#E5E7E6] px-3 py-2 text-xs disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight className="size-4" />
      </button>
    </nav>
  );
};

export default CompactPagination;
