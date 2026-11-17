import { axiosInstance } from "@/lib/axiosInstance";
import { reportEventPayload, type ReportSubject } from "../helpers/reportEvents";
import type { ReportEventType } from "../types/api";
export const recordReportEvent = async (type: ReportEventType, subject: ReportSubject) => {
  const { data } = await axiosInstance.post("/reports/events", reportEventPayload(type, subject));
  return data;
};
export const trackReportEvent = (type: ReportEventType, subject: ReportSubject) => {
  // Demonstration fixtures have no persisted owner and must not generate insights.
  const id = subject.resourceType === "profile" ? subject.subjectUserId : subject.resourceId;
  if (!id || /^(expert|job|material|dummy|test)-\d+$/.test(id)) return;
  void recordReportEvent(type, subject).catch(() => {});
};
