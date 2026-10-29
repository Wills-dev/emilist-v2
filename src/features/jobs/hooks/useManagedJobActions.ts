"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { normalizeJobStatus } from "../helpers/manageJobs";
import { jobActionLabels } from "../helpers/jobManagement";
import type { JobAction } from "../types/jobManagement";
import type { JobDetailsViewModel } from "../types/jobDetails";

export const useManagedJobActions = (job: JobDetailsViewModel | undefined, originTab: string) => {
  const router = useRouter();
  const userId = useStore((state) => state.currentUser?._id);
  const [milestoneId, setMilestoneId] = useState<string | null>(null);
  const completionMilestone = job?.milestones.find((milestone) => milestone.id === milestoneId);
  const closeCompleteMilestone = () => setMilestoneId(null);
  const handleAction = (action: JobAction, selectedMilestoneId?: string) => {
    if (!job) return;
    if (action === "complete-milestone") {
      const milestone = job.milestones.find((item) => item.id === selectedMilestoneId);
      if (!userId || userId === job.ownerId || normalizeJobStatus(job.status) !== "active" || !milestone || !["active", "in-progress"].includes(normalizeJobStatus(milestone.status ?? ""))) return;
      setMilestoneId(milestone.id);
      return;
    }
    if (action === "rate-employer") {
      router.push(routes.dashboardLinks.employerProfile(job.ownerId, job.id, originTab, true));
    } else if (action === "edit") {
      router.push(routes.dashboardLinks.editJob(job.id));
    } else {
      toast.info(`${jobActionLabels[action]} is not available yet.`);
    }
  };
  return { handleAction, completionMilestone, closeCompleteMilestone };
};
