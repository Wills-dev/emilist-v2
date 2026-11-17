import type { ReportEventType, ReportResourceType } from "../types/api";
export type ReportSubject =
  | { resourceType: "profile"; subjectUserId: string }
  | { resourceType: Exclude<ReportResourceType, "profile">; resourceId: string };

export const reportEventPayload = (type: ReportEventType, subject: ReportSubject) => {
  if (subject.resourceType === "profile") {
    if (!subject.subjectUserId) throw new Error("Profile tracking requires a user ID.");
    return { type, resourceType: "profile" as const, subjectUserId: subject.subjectUserId };
  }
  if (!subject.resourceId) throw new Error("Resource tracking requires a resource ID.");
  return { type, resourceType: subject.resourceType, resourceId: subject.resourceId };
};
