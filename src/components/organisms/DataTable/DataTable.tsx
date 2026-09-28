"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";

const DataTable = <TData,>({
  data,
  columns,
  minWidth = "min-w-220",
  rowClassName = "odd:bg-[#FBFCFB] even:bg-white",
  headerClassName = "",
}: {
  data: TData[];
  columns: ColumnDef<TData>[];
  minWidth?: string;
  rowClassName?: string | ((row: TData) => string);
  headerClassName?: string;
}) => {
  // TanStack Table is the column-driven engine used by shadcn data tables.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className={minWidth}>
      <TableHeader className="bg-white text-[#4F5D75]">
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead key={header.id} className={headerClassName}>
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
          <TableRow key={row.id} className={typeof rowClassName === "function" ? rowClassName(row.original) : rowClassName}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
