"use client";

import { useState } from "react";
import { toast } from "sonner";

import Container from "@/components/atoms/Container/Container";

import {
  chartReports,
  defaultReportTargets,
} from "../../constants/dummyReports";
import { ReportTargets, ReportTab } from "../../types";
import ReportsContent from "../ReportsContent/ReportsContent";
import ReportsHeader from "../ReportsHeader/ReportsHeader";
import TargetModal from "../TargetModal/TargetModal";

const downloadReportCsv = (tab: ReportTab) => {
  const rows = chartReports
    .filter((report) => report.tab === tab)
    .flatMap((report) =>
      report.legends.map((item) => [report.title, item.label, item.value]),
    );
  const csv = ["Report,Metric,Value", ...rows.map((row) => row.join(","))].join(
    "\n",
  );
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${tab}-report.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const ReportsWrapper = ({ hasData = true }: { hasData?: boolean }) => {
  const [tab, setTab] = useState<ReportTab>("jobs");
  const [search, setSearch] = useState("");
  const [targets, setTargets] = useState(defaultReportTargets);
  const [targetModal, setTargetModal] = useState<"set" | "review" | null>(null);

  const handleSaveTargets = (nextTargets: ReportTargets) => {
    setTargets(nextTargets);
    setTargetModal(null);
    toast.success(
      targetModal === "set" ? "Targets have been set." : "Targets updated.",
    );
  };

  return (
    <Container variant="small" className="py-4">
      <main className="space-y-4">
        <ReportsHeader
          tab={tab}
          search={search}
          onTabChange={(nextTab) => {
            setTab(nextTab);
            setSearch("");
          }}
          onSearchChange={setSearch}
          onDownload={() => downloadReportCsv(tab)}
          onSetTargets={() => setTargetModal("set")}
        />

        <ReportsContent
          tab={tab}
          search={search}
          targets={targets}
          hasData={hasData}
          onEditTargets={() => setTargetModal("review")}
        />
      </main>

      {targetModal && (
        <TargetModal
          key={`${targetModal}-${targets.amountEarned}`}
          open
          mode={targetModal}
          targets={targets}
          onClose={(open) => !open && setTargetModal(null)}
          onSave={handleSaveTargets}
        />
      )}
    </Container>
  );
};

export default ReportsWrapper;
