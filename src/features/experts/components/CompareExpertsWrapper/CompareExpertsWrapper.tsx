"use client";

import ComparisonSkeleton from "@/components/molecules/PageSkeleton/ComparisonSkeleton/ComparisonSkeleton";
import { ArrowRight, Download } from "lucide-react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import { useComparedExperts } from "../../hooks/useComparedExperts";
import CompareExpertCard from "../CompareExpertCard/CompareExpertCard";

const CompareExpertsWrapper = () => {
  const { experts: comparedExperts, downloadReport, retry, loading, error } = useComparedExperts();

  if (loading) return <ComparisonSkeleton variant="expert" />;
  return (
    <Container variant="small">
      <main className="w-full py-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <BackButton isDashboard />
          <button type="button" disabled={loading || error || !comparedExperts.length} onClick={downloadReport} className="flex items-center gap-1 text-xs text-[#18A154] underline sm:text-sm"><Download className="size-4 sm:hidden" /><span>Download Comparison Report</span><ArrowRight className="size-4" /></button>
        </div>
        {error && <button type="button" onClick={retry}>Unable to load experts. Try again</button>}
        {!loading && !error && !comparedExperts.length && <p>No compared experts found.</p>}
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
