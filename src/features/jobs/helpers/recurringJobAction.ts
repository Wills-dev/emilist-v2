const calendarDay = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  return ["year", "month", "day"].map((type) => parts.find((part) => part.type === type)?.value).join("-");
};

export const recurringJobAction = (job: { jobUrgency?: string; endDate?: string }, now = new Date()): "convert" | "renew" | null => {
  if (job.jobUrgency?.trim().toLowerCase() !== "regularly") return "convert";
  if (!job.endDate) return null;
  const end = new Date(job.endDate);
  if (!Number.isFinite(end.getTime()) || !Number.isFinite(now.getTime())) return null;
  // The end date is inclusive; a recurring contract runs through that day.
  return calendarDay(now) > calendarDay(end) ? "renew" : null;
};
