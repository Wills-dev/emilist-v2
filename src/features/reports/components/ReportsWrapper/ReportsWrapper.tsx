"use client";

import Container from "@/components/atoms/Container/Container";
import { useReports } from "../../hooks/useReports";
import ReportsContent from "../ReportsContent/ReportsContent";
import ReportsHeader from "../ReportsHeader/ReportsHeader";
import TargetModal from "../TargetModal/TargetModal";
const ReportsWrapper = () => {
  const controller = useReports();
  return <Container variant="small" className="py-4">
    <main className="space-y-4"><ReportsHeader controller={controller} /><ReportsContent controller={controller} /></main>
    {controller.targetModal && controller.query.data && <TargetModal mode={controller.targetModal} target={controller.query.data.insights.targets} year={controller.filters.year} month={controller.filters.month} currency={controller.filters.currency} onClose={controller.closeTargets} />}
  </Container>;
};
export default ReportsWrapper;
