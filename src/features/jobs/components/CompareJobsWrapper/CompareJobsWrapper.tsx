"use client";

import { ArrowRight, Download } from "lucide-react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import { comparedJobs } from "../../constants/dummy";
import CompareJobCard from "../CompareJobCard/CompareJobCard";

const CompareJobsWrapper = () => {
  const downloadReport = () => {
    const headers = ["Job", "Budget", "Category", "Location", "Experience", "Notice Period", "Employer Rating"];
    const rows = comparedJobs.map((job) => [job.title, job.price, job.category, job.location, job.experience, job.noticePeriod, job.employerRating]);
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "job-comparison.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container variant="small">
      <main className="w-full py-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <BackButton isDashboard />
          <button type="button" onClick={downloadReport} className="flex items-center gap-1 text-xs text-[#18A154] underline sm:text-sm">
            <Download className="size-4 sm:hidden" />
            <span>Download Comparison Report</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="w-full overflow-x-auto overscroll-x-contain pb-4" aria-label="Compared jobs">
          <div className="flex w-max gap-3">
            {comparedJobs.map((job, index) => <CompareJobCard key={job.id} job={job} index={index} />)}
          </div>
        </div>
        <div className="flex items-center justify-between px-2 pt-2 sm:hidden">
          <div className="flex gap-1">
            {comparedJobs.map((job, index) => <span key={job.id} className={`size-2.5 rounded-full ${index === 0 ? "bg-[#25C269]" : "bg-[#D9D9D9]"}`} />)}
          </div>
          <p className="flex items-center gap-2 text-sm italic text-[#737774]">Swipe to see all <ArrowRight className="size-4" /></p>
        </div>
      </main>
    </Container>
  );
};

export default CompareJobsWrapper;
