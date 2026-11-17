import type { ReportTarget, UserReport } from "../types/api";
const metrics = (value: unknown, keys: string[]) => {
  if (!value || typeof value !== "object") throw new Error("The reports response is incomplete.");
  for (const key of keys) {
    const number = (value as Record<string, unknown>)[key];
    if (typeof number !== "number" || !Number.isFinite(number) || number < 0) throw new Error(`The reports response contains an invalid ${key} value.`);
  }
};
export const validateTarget = (target: ReportTarget) => {
  if (!target || typeof target.configured !== "boolean" || !["monthly", "yearly"].includes(target.duration)) throw new Error("The target response is invalid.");
  metrics(target.goals, ["jobs", "amount", "referrals", "invites"]);
  metrics(target.actual, ["jobs", "amount", "referrals", "invites"]);
  metrics(target.progress, ["jobs", "amount", "referrals", "invites", "overall"]);
  return target;
};
export const validateReport = (report: UserReport) => {
  if (!report?.filters?.label || !report.finance?.currency || !Array.isArray(report.finance.availableCurrencies)) throw new Error("The reports response is invalid.");
  metrics(report.jobs, ["total", "active", "pending", "completed", "overdue"]);
  if (typeof report.jobs.hasRecords !== "boolean" || typeof report.applications?.flaggedTrackingAvailable !== "boolean") throw new Error("The report availability flags are missing.");
  for (const summary of [report.applications.applicants, report.applications.myApplications]) metrics(summary, ["total", "hired", "rehired", "flagged", "pending", "rejected"]);
  for (const type of ["earnings", "expenses"] as const) {
    metrics(report.finance[type], ["total"]);
    metrics(report.finance[type].categories, type === "earnings" ? ["jobs", "materials", "referrals", "others"] : ["jobs", "materials", "promotions", "others"]);
  }
  metrics(report.trade?.orders, ["total", "completed", "pending", "cancelled", "returned"]);
  metrics(report.trade?.sales, ["total", "completed", "pending", "ongoing", "cancelled", "returned"]);
  metrics(report.insights?.overview, ["impressions", "reach", "saves", "shares", "clicks", "contacts"]);
  metrics(report.insights.promotionDuration, ["totalDays", "daysRemaining", "daysUsed"]);
  metrics(report.insights.clicks, ["trackedClicks", "promotionClicks", "total"]);
  for (const field of ["limit", "remaining"] as const) {
    const value = report.insights.clicks[field];
    if (value !== null && (typeof value !== "number" || !Number.isFinite(value) || value < 0)) throw new Error("The click limits response is invalid.");
  }
  validateTarget(report.insights.targets);
  return report;
};
