"use client";

import Button from "@/components/atoms/Button/Button";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import ComparisonSkeleton from "@/components/molecules/PageSkeleton/ComparisonSkeleton/ComparisonSkeleton";
import { ArrowRight, Download } from "lucide-react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import { useComparedJobs } from "../../hooks/useComparedJobs";
import CompareJobCard from "../CompareJobCard/CompareJobCard";

const CompareJobsWrapper = () => {
  const { jobs: comparedJobs, loading, error, retry, downloadReport, browseJobs } = useComparedJobs();

  if (loading) return <ComparisonSkeleton />;
  return (
    <Container variant="small">
      <main className="w-full py-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <BackButton isDashboard />
          <div className="flex flex-wrap items-center justify-end gap-3">
          <Button variant="secondary" className="h-9 text-xs" onClick={browseJobs}>Add jobs to compare</Button>
          <button type="button" disabled={!comparedJobs.length || loading} onClick={downloadReport} className="flex items-center gap-1 text-xs text-[#18A154] underline sm:text-sm">
            <Download className="size-4 sm:hidden" />
            <span>Download Comparison Report</span>
            <ArrowRight className="size-4" />
          </button>
          </div>
        </div>
        {error && <button type="button" onClick={retry}>Some jobs could not be loaded. Try again</button>}
        {!error && !comparedJobs.length && <EmptyState title="No jobs added to comparison" description="Browse jobs, select Compare prices, then Add to comparison. Return here to compare the jobs side by side." actionLabel="Browse jobs" onAction={browseJobs} />}
        <div className="w-full overflow-x-auto overscroll-x-contain pb-4" aria-label="Compared jobs">
          <div className="flex w-max gap-3">
            {comparedJobs.map((job, index) => <CompareJobCard key={job.id} job={job} index={index} />)}
          </div>
        </div>
        {comparedJobs.length > 1 && <div className="flex items-center justify-between px-2 pt-2 sm:hidden">
          <div className="flex gap-1">
            {comparedJobs.map((job, index) => <span key={job.id} className={`size-2.5 rounded-full ${index === 0 ? "bg-[#25C269]" : "bg-[#D9D9D9]"}`} />)}
          </div>
          <p className="flex items-center gap-2 text-sm italic text-[#737774]">Swipe to see all <ArrowRight className="size-4" /></p>
        </div>}
      </main>
    </Container>
  );
};

export default CompareJobsWrapper;
