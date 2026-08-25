import { ColumnDef } from "@tanstack/react-table";

import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import DataTable from "@/components/organisms/DataTable/DataTable";

const TableSkeleton = () => (
  <div className="space-y-3 py-6">
    {Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className="mx-5 h-12 animate-pulse rounded-lg bg-[#F4F7F5]"
      />
    ))}
  </div>
);

const ManageJobsTable = <TData,>({
  data,
  columns,
  isLoading = false,
  isError = false,
  page,
  totalPages,
  onPrev,
  onNext,
  onPageChange,
  emptyTitle = "No jobs found",
  emptyDescription = "Create a job or apply to one on the marketplace",
}: {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  isError?: boolean;
  page: number;
  totalPages?: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}) => {
  if (isLoading) return <TableSkeleton />;

  if (isError) {
    return (
      <div className="px-5 py-6 bg-white">
        <EmptyState
          title="Unable to load jobs"
          description="Please refresh the page and try again."
          className="min-h-56"
        />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="px-5 py-6 bg-white">
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          className="min-h-72"
        />
      </div>
    );
  }

  return (
    <div className="py-4 bg-white">
      <div className="overflow-x-auto">
        <DataTable data={data} columns={columns} />
      </div>
      {(totalPages ?? 0) > 1 && (
        <div className="px-5">
          <PaginationPanel
            page={page}
            totalPages={totalPages}
            onPrev={onPrev}
            onNext={onNext}
            onPageChange={onPageChange}
            variant="centered"
          />
        </div>
      )}
    </div>
  );
};

export default ManageJobsTable;
