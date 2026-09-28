"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import JobActionsMenu from "../JobActionsMenu/JobActionsMenu";
import { toast } from "sonner";

import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { routes } from "@/lib/helpers/routes";
import type { CompletedJobRow } from "../../types/manageJobs";

export const completedJobsColumns: ColumnDef<CompletedJobRow>[] = [
  { accessorKey: "completedDate", header: "Completed Date" },
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
        href={routes.dashboardLinks.jobInfo(row.original.id, "completed")}
        className="font-medium text-[#101828] hover:text-[#6667FF] hover:underline"
      >
        {row.original.jobTitle}
      </Link>
    ),
  },
  { accessorKey: "duration", header: "Job Duration" },
  { accessorKey: "budget", header: "Budget" },
  {
    id: "status",
    header: "Job Status",
    cell: () => <StatusBadge label="Completed" tone="neutral" />,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <JobActionsMenu
        jobTitle={row.original.jobTitle}
        viewHref={routes.dashboardLinks.jobInfo(row.original.id, "completed")}
        actions={[
          {
            label: "Leave a Review",
            onSelect: () => toast.info("Leave a Review is coming soon."),
          },
        ]}
      />
    ),
  },
];
