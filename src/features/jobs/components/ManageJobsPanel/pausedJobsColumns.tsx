"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";

import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { routes } from "@/lib/helpers/routes";
import type { PausedJobRow } from "../../types/manageJobs";

export const pausedJobsColumns: ColumnDef<PausedJobRow>[] = [
  { accessorKey: "dateCreated", header: "Date Created" },
  { accessorKey: "jobId", header: "Job ID", cell: ({ row }) => <span className="text-[#8A8D8B]">{row.original.jobId}</span> },
  { accessorKey: "jobTitle", header: "Job Title", cell: ({ row }) => <span className="font-medium text-[#101828]">{row.original.jobTitle}</span> },
  { accessorKey: "duration", header: "Job Duration" },
  { accessorKey: "budget", header: "Budget" },
  { id: "status", header: "Job Status", cell: () => <StatusBadge label="Paused" tone="warning" /> },
  {
    id: "resume",
    header: "",
    cell: () => (
      <button
        type="button"
        onClick={() => toast.info("Resume Job is coming soon.")}
        className="text-sm font-medium text-[#6667FF]"
      >
        Resume Job
      </button>
    ),
  },
  {
    id: "view",
    header: "",
    cell: ({ row }) => (
      <Link href={routes.dashboardLinks.marketplaceJobInfo(row.original.id)} className="text-sm text-[#737774]">
        View
      </Link>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <button type="button" aria-label="More actions" className="text-[#8A8D8B]">
        <MoreVertical className="size-4" />
      </button>
    ),
  },
];
