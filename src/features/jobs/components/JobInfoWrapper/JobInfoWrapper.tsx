"use client";

import Container from "@/components/atoms/Container/Container";
import JobMainInfo from "../JobMainInfo/JobMainInfo";
import JobMilestoneInfo from "../JobMilestoneInfo/JobMilestoneInfo";
import JobInfoSkeleton from "../JobInfoSkeleton/JobInfoSkeleton";

import { useGetJobById } from "../../hooks/useGetJobById";

const JobInfoWrapper = ({ jobId }: { jobId: string }) => {
  const { data: job, isPending, isError, refetch } = useGetJobById(jobId);

  if (isPending) {
    return <JobInfoSkeleton />;
  }

  if (isError || !job) {
    return (
      <div className="space-y-4 py-20 text-center text-sm text-[#707471]">
        <p>We could not load this job.</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="font-semibold text-[#25C269] underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-10">
      <Container>
        <div className="w-full flex flex-wrap gap-10">
          <JobMainInfo jobId={jobId} job={job} />
          <div className="max-w-119.25 w-full max-sm:hidden">
            <JobMilestoneInfo milestones={job.milestones} />
          </div>
        </div>
      </Container>
      <div className="sm:hidden">
        <JobMilestoneInfo milestones={job.milestones} />
      </div>
    </div>
  );
};

export default JobInfoWrapper;
