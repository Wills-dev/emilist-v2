"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/helpers/routes";
import {
  resolveJobStatusMeta,
  resolveListedJobAction,
} from "../../helpers/manageJobs";
import type { ListedJobRow } from "../../types/manageJobs";

export const listedJobsColumns: ColumnDef<ListedJobRow>[] = [
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "jobType",
    header: "Job Type",
    cell: ({ row }) => (
      <span
        className={cn(
          "flex items-center gap-1.5 text-[#4F5D75]",
          row.original.needsAction &&
            "before:inline-block before:size-1.5 before:rounded-full before:bg-[#18A154]",
        )}
      >
        {row.original.jobType}
      </span>
    ),
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => (
      <span className="font-medium text-[#101828]">
        {row.original.jobTitle}
      </span>
    ),
  },
  { accessorKey: "jobDuration", header: "Job Duration" },
  { accessorKey: "budget", header: "Budget" },
  {
    accessorKey: "statusRaw",
    header: "Job Status",
    cell: ({ row }) => {
      const meta = resolveJobStatusMeta(row.original.statusRaw);
      return <StatusBadge label={meta.label} tone={meta.tone} />;
    },
  },
  {
    id: "action",
    header: "",
    cell: ({ row }) => {
      const action = resolveListedJobAction(
        row.original.statusRaw,
        row.original.isOwner,
      );
      return (
        <button
          type="button"
          disabled={action.disabled}
          onClick={() => toast.info(`${action.label} is coming soon.`)}
          className="text-sm font-medium text-[#6667FF] disabled:cursor-not-allowed disabled:text-[#B7BAC7]"
        >
          {action.label}
        </button>
      );
    },
  },
  {
    id: "view",
    header: "",
    cell: ({ row }) => (
      <Link
        href={routes.dashboardLinks.marketplaceJobInfo(row.original.id)}
        className="text-sm text-[#737774]"
      >
        View
      </Link>
    ),
  },
];
