"use client";

import type { JobListApplicationDto } from "../../types/listJobs";
import ApplyJobButton from "../ApplyJobButton/ApplyJobButton";
import Button from "@/components/atoms/Button/Button";

import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";

const JobCardActions = ({
  jobId,
  applications,
  status,
  posterId,
  detailsHref,
}: {
  jobId: string;
  applications?: JobListApplicationDto[];
  status?: string;
  posterId?: string;
  detailsHref?: string;
}) => {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const isJobOwner = Boolean(currentUserId && currentUserId === posterId);

  return (
    <div className="flex items-center w-full gap-2.5">
      <div className="flex-1 w-full">
        {" "}
        <Button
          variant="default"
          className="w-full h-8 text-xs"
          href={detailsHref ?? routes.marketplace.jobInfo(jobId)}
        >
          View More
        </Button>
      </div>
      {!isJobOwner && (
        <div className="flex-1 w-full">
          <ApplyJobButton applications={applications} status={status} jobId={jobId} ownerId={posterId} className="w-full h-8 text-xs" />
        </div>
      )}
    </div>
  );
};

export default JobCardActions;
