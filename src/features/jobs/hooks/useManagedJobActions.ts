"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { getAcceptedApplicationId } from "../helpers/acceptedApplicationId";
import { useUpdateApplicationStatus } from "./useUpdateApplicationStatus";
import { normalizeJobStatus } from "../helpers/manageJobs";
import { jobActionLabels } from "../helpers/jobManagement";
import type { JobAction } from "../types/jobManagement";
import type { JobDetailsViewModel } from "../types/jobDetails";

export const useManagedJobActions = (job: JobDetailsViewModel | undefined) => {
  const router = useRouter();
  const userId = useStore((state) => state.currentUser?._id);
  const [reviewOwnerOpen, setReviewOwnerOpen] = useState(false);
  const closeOwnerReview = () => setReviewOwnerOpen(false);
  const [milestoneId, setMilestoneId] = useState<string | null>(null);
  const [playbackAction, setPlaybackAction] = useState<"pause" | "resume" | null>(null);
  const changingPlayback = useRef(false);
  const playbackTarget = useRef<string | null>(null);
  const playbackMutation = useUpdateApplicationStatus(() => {
    playbackTarget.current = null;
    setPlaybackAction(null);
  });
  const canChangePlayback = (action: "pause" | "resume") => Boolean(job && userId && userId === job.ownerId && !(action === "pause" && job.canCloseContract === true) && normalizeJobStatus(job.status) === (action === "pause" ? "active" : "paused"));
  const closePlaybackConfirmation = () => {
    if (!playbackMutation.isPending && !changingPlayback.current) setPlaybackAction(null);
  };
  const confirmPlayback = () => {
    if (!job || !playbackAction || playbackMutation.isPending || changingPlayback.current) return;
    if (!canChangePlayback(playbackAction)) {
      setPlaybackAction(null);
      toast.info("The job status has changed. Review the latest status before continuing.");
      return;
    }
    const applicationId = getAcceptedApplicationId(job);
    if (!applicationId || applicationId !== playbackTarget.current) {
      setPlaybackAction(null);
      toast.info("The assigned application has changed or is unavailable. Review the job before continuing.");
      return;
    }
    changingPlayback.current = true;
    playbackMutation.mutate({ projectId: applicationId, status: playbackAction === "pause" ? "pause" : "unpause" }, {
      onSettled: () => { changingPlayback.current = false; },
    });
  };
  const completionMilestone = job?.milestones.find((milestone) => milestone.id === milestoneId);
  const closeCompleteMilestone = () => setMilestoneId(null);
  const handleAction = (action: JobAction, selectedMilestoneId?: string) => {
    if (!job) return;
    if (action === "pause" || action === "resume") {
      if (!playbackMutation.isPending && !changingPlayback.current && canChangePlayback(action)) {
        const applicationId = getAcceptedApplicationId(job);
        if (!applicationId) {
          toast.error("The accepted application ID is missing from this job. Refresh the job details before trying again.");
          return;
        }
        playbackTarget.current = applicationId;
        setPlaybackAction(action);
      }
      return;
    }
    if (action === "complete-milestone") {
      const milestone = job.milestones.find((item) => item.id === selectedMilestoneId);
      if (!userId || userId === job.ownerId || normalizeJobStatus(job.status) !== "active" || !milestone || !["active", "in-progress"].includes(normalizeJobStatus(milestone.status ?? ""))) return;
      setMilestoneId(milestone.id);
      return;
    }
    if (action === "rate-employer") {
      if (!userId || userId === job.ownerId || job.hasReviewedJobOwner === true || normalizeJobStatus(job.status) !== "completed") return;
      setReviewOwnerOpen(true);
    } else if (action === "edit") {
      router.push(routes.dashboardLinks.editJob(job.id));
    } else {
      toast.info(`${jobActionLabels[action]} is not available yet.`);
    }
  };
  return { reviewOwnerOpen, closeOwnerReview, handleAction, completionMilestone, closeCompleteMilestone, playbackAction, confirmPlayback, closePlaybackConfirmation, isUpdatingPlayback: playbackMutation.isPending };
};
