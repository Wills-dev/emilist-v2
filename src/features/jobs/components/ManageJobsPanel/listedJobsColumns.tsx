"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import JobActionsMenu from "../JobActionsMenu/JobActionsMenu";
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
      <Link
        href={routes.dashboardLinks.jobInfo(row.original.id)}
        className="rounded-sm font-medium text-[#101828] hover:text-[#6667FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6667FF]"
      >
        {row.original.jobTitle}
      </Link>
    ),
  },
  {
    accessorKey: "jobDuration",
    header: "Job Duration",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.original.jobDuration}</span>
    ),
  },
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
      const action = resolveListedJobAction(row.original.statusRaw);
      return (
        <JobActionsMenu
          jobTitle={row.original.jobTitle}
          viewHref={routes.dashboardLinks.jobInfo(row.original.id)}
          actions={
            action
              ? [
                  action.label === "Edit Job"
                    ? {
                        label: action.label,
                        disabled: action.disabled,
                        href: routes.dashboardLinks.editJob(row.original.id),
                      }
                    : {
                        label: action.label,
                        disabled: action.disabled,
                        onSelect: () =>
                          toast.info(`${action.label} is coming soon.`),
                      },
                ]
              : []
          }
        />
      );
    },
  },
];
