"use client";

import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";
import { routes } from "@/lib/helpers/routes";
import { useHomeJobs } from "../../hooks/useHomeJobs";
import JobCardSkeleton from "../JobCard/JobCardSkeleton";
import JobCardItem from "../JobCardItem/JobCardItem";

const HOME_JOB_LIMIT = 4;

const HomeJobSection = () => {
  const { jobs, query } = useHomeJobs(HOME_JOB_LIMIT);

  return (
    <SectionWrapper className="no-scrollbar">
      {query.isPending ? (
        Array.from({ length: HOME_JOB_LIMIT }, (_, index) => (
          <JobCardSkeleton key={index} />
        ))
      ) : query.isError ? (
        <EmptyState
          title="Unable to load jobs"
          description="We couldn't fetch the latest jobs. Please try again."
          actionLabel="Try again"
          onAction={() => void query.refetch()}
          className="min-h-64 min-w-full"
        />
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No jobs available"
          description="New opportunities will appear here once they are posted."
          className="min-h-64 min-w-full"
        />
      ) : (
        jobs.map((job) => (
          <JobCardItem
            key={job.id}
            job={job}
            detailsHref={routes.marketplace.jobInfo(job.id)}
          />
        ))
      )}
    </SectionWrapper>
  );
};

export default HomeJobSection;
