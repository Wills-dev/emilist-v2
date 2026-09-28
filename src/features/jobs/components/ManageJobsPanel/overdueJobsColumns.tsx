"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import JobActionsMenu from "../JobActionsMenu/JobActionsMenu";
import { toast } from "sonner";

import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { routes } from "@/lib/helpers/routes";
import type { OverdueJobRow } from "../../types/manageJobs";

export const overdueJobsColumns: ColumnDef<OverdueJobRow>[] = [
  { accessorKey: "startDate", header: "Start Date" },
  {
    accessorKey: "jobId",
    header: "Job ID",
    cell: ({ row }) => (
      <span className="text-[#8A8D8B]">{row.original.jobId}</span>
    ),
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => (
      <Link
        href={routes.dashboardLinks.jobInfo(row.original.id, "overdue")}
        className="font-medium text-[#101828] hover:text-[#6667FF] hover:underline"
      >
        {row.original.jobTitle}
      </Link>
    ),
  },
  {
    accessorKey: "duration",
    header: "Job Duration",
    cell: ({ row }) => (
      <span className="text-[#FF5D7A]">{row.original.duration}</span>
    ),
  },
  { accessorKey: "budget", header: "Budget" },
  {
    id: "status",
    header: "Job Status",
    cell: () => <StatusBadge label="Overdue" tone="danger" />,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <JobActionsMenu
        jobTitle={row.original.jobTitle}
        viewHref={routes.dashboardLinks.jobInfo(row.original.id, "overdue")}
        actions={[
          {
            label: "Cancel Job",
            onSelect: () => toast.info("Cancel Job is coming soon."),
          },
        ]}
      />
    ),
  },
];
