import { ColumnDef } from "@tanstack/react-table";

import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import DataTable from "@/components/organisms/DataTable/DataTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";

const SKELETON_BAR_WIDTHS = ["w-20", "w-24", "w-32", "w-16", "w-20", "w-16"];

const getColumnKey = <TData,>(column: ColumnDef<TData>, index: number) =>
  (column as { accessorKey?: string; id?: string }).accessorKey ??
  column.id ??
  `col-${index}`;

const TableSkeleton = <TData,>({
  columns,
  rows = 5,
}: {
  columns: ColumnDef<TData>[];
  rows?: number;
}) => (
  <div className="overflow-x-auto">
    <Table className="min-w-220">
      <TableHeader className="bg-white text-[#4F5D75]">
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={getColumnKey(column, index)} className="whitespace-nowrap">
              {typeof column.header === "string" ? column.header : ""}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <TableRow key={rowIndex} className="odd:bg-[#FBFCFB] even:bg-white">
            {columns.map((column, colIndex) => (
              <TableCell key={getColumnKey(column, colIndex)}>
                <div
                  className={`h-4 ${SKELETON_BAR_WIDTHS[colIndex % SKELETON_BAR_WIDTHS.length]} animate-pulse rounded bg-[#F1F2F9]`}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
  rowClassName,
  emptyTitle = "No jobs found",
  emptyDescription = "Create a job or apply to one on the marketplace",
}: {
  rowClassName?: string | ((row: TData) => string);
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
  if (isLoading) return <TableSkeleton columns={columns} />;

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
        <DataTable data={data} columns={columns} rowClassName={rowClassName} headerClassName="whitespace-nowrap" />
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
