"use client";

import { ArrowRight, Download } from "lucide-react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import CompareMaterialCard from "../CompareMaterialCard/CompareMaterialCard";
import CompareMaterialCardSkeleton from "../CompareMaterialCard/CompareMaterialCardSkeleton";
import { useGetComparedMaterials } from "../../hooks/useGetComparedMaterials";
import Container from "@/components/atoms/Container/Container";
import { mapComparedMaterial } from "./mapComparedMaterial";
import { useDownloadComparisonReport } from "../../hooks/useDownloadComparisonReport";

const CompareMaterialsWrapper = () => {
  const { data, isLoading, isError } = useGetComparedMaterials();
  const comparedProducts = data?.enhancedProducts ?? [];
  const materials = comparedProducts.map(mapComparedMaterial);
  const { downloadReport, canDownload } =
    useDownloadComparisonReport(comparedProducts);

  return (
    <Container variant="small">
      <main className="w-full py-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <BackButton isDashboard />
          <button
            type="button"
            onClick={downloadReport}
            disabled={!canDownload}
            className="flex items-center gap-1 text-xs text-[#18A154] underline transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
          >
            <Download className="size-4 sm:hidden" />
            <span>Download Comparison Report</span>
            <ArrowRight className="size-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex w-full gap-3 overflow-hidden pb-4">
            {[1, 2, 3].map((item) => (
              <CompareMaterialCardSkeleton key={item} />
            ))}
          </div>
        ) : isError ? (
          <EmptyState
            title="Unable to load compared materials"
            description="Please refresh the page and try again."
            className="min-h-72"
          />
        ) : materials.length === 0 ? (
          <EmptyState
            title="No compared materials"
            description="Materials you add for comparison will appear here."
            className="min-h-72"
          />
        ) : (
          <div
            className="w-full overflow-x-auto overscroll-x-contain pb-4"
            aria-label="Compared materials"
          >
            <div className="flex w-max gap-3">
              {materials.map((material, index) => (
                <CompareMaterialCard
                  key={material.id}
                  material={material}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {materials.length > 1 && (
          <div className="flex items-center justify-between px-2 pt-2 sm:hidden">
            <div className="flex gap-1">
              {materials.map((material, index) => (
                <span
                  key={material.id}
                  className={`size-2.5 rounded-full ${
                    index === 0 ? "bg-[#25C269]" : "bg-[#D9D9D9]"
                  }`}
                />
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm italic text-[#737774]">
              Swipe to see all <ArrowRight className="size-4" />
            </p>
          </div>
        )}
      </main>
    </Container>
  );
};

export default CompareMaterialsWrapper;
