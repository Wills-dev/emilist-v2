import PaginationControls from "@/components/atoms/PaginationControls/PaginationControls";

const PaginationPanel = ({
  page,
  totalPages,
  hasMore = false,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages?: number;
  hasMore?: boolean;
  onPrev: () => void;
  onNext: () => void;
}) => {
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
