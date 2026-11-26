export interface JobListingTarget {
  id: string; title: string; ownerId?: string; isListed?: boolean;
  acceptedApplicationId?: string | null;
  applications?: { status?: string }[];
}
export type JobListingAction = "delete" | "delist" | "list";
export const jobListingLabels = { delete: "Delete Job", delist: "Delist Job", list: "List Job" };
export const jobListingActions = (job?: JobListingTarget, userId?: string): JobListingAction[] => {
  if (!job?.id || !userId || job.ownerId !== userId) return [];
  const accepted = Boolean(job.acceptedApplicationId) || job.applications?.some((item) => ["accepted", "active", "pause", "paused", "unpause"].includes(item.status?.trim().toLowerCase() ?? ""));
  return [...(!accepted ? ["delete" as const] : []), job.isListed === false ? "list" : "delist"];
};
