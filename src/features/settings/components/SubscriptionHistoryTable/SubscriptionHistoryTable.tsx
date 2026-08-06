"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/lib/hooks/usePagination";
import { SubscriptionHistoryItem } from "../../types/subscription";
import { subscriptionHistoryColumns } from "./columns";

const PAGE_SIZE = 3;

const SubscriptionHistoryTable = ({
  data,
}: {
  data: SubscriptionHistoryItem[];
}) => {
  const pagination = usePagination();
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const pageData = data.slice(
    (pagination.currentPage - 1) * PAGE_SIZE,
    pagination.currentPage * PAGE_SIZE,
  );
  // TanStack Table is the column-based engine used by shadcn data tables.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: pageData,
    columns: subscriptionHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="bg-white p-4 max-sm:p-2">
      <Table className="min-w-220">
        <TableHeader className="bg-white text-[#4F5D75]">
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="odd:bg-[#FBFCFB] even:bg-white">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full pt-1">
        <PaginationPanel
          page={pagination.currentPage}
          totalPages={totalPages}
          onPrev={pagination.prev}
          onNext={pagination.next}
          onPageChange={pagination.setCurrentPage}
        />
      </div>
    </section>
  );
};

export default SubscriptionHistoryTable;
