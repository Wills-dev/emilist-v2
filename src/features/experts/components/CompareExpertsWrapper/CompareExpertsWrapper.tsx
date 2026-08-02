"use client";

import { ArrowRight, Download } from "lucide-react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import { comparedExperts } from "../../constants/dummy";
import CompareExpertCard from "../CompareExpertCard/CompareExpertCard";

const CompareExpertsWrapper = () => {
  const downloadReport = () => {
    const headers = ["Expert", "Rate", "Experience", "Rating", "Reviews", "Service", "Jobs Completed", "Notice Period", "Location", "Languages", "Insurance"];
    const rows = comparedExperts.map((expert) => [expert.name, expert.price, expert.experience, expert.rating, expert.reviewCount, expert.serviceCategory, expert.jobsCompleted, expert.noticePeriod, expert.location, expert.languages, expert.insurance]);
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "expert-comparison.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container variant="small">
      <main className="w-full py-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <BackButton isDashboard />
          <button type="button" onClick={downloadReport} className="flex items-center gap-1 text-xs text-[#18A154] underline sm:text-sm"><Download className="size-4 sm:hidden" /><span>Download Comparison Report</span><ArrowRight className="size-4" /></button>
        </div>
        <div className="w-full overflow-x-auto overscroll-x-contain pb-4" aria-label="Compared experts"><div className="flex w-max gap-3">{comparedExperts.map((expert, index) => <CompareExpertCard key={expert.id} expert={expert} index={index} />)}</div></div>
        <div className="flex items-center justify-between px-2 pt-2 sm:hidden">
          <div className="flex gap-1">{comparedExperts.map((expert, index) => <span key={expert.id} className={`size-2.5 rounded-full ${index === 0 ? "bg-[#25C269]" : "bg-[#D9D9D9]"}`} />)}</div>
          <p className="flex items-center gap-2 text-sm italic text-[#737774]">Swipe to see all <ArrowRight className="size-4" /></p>
        </div>
      </main>
    </Container>
  );
};

export default CompareExpertsWrapper;
