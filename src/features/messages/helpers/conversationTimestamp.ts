const calendarDay = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

export const conversationTimestamp = (value: string, now = new Date()) => {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  const daysAgo = (calendarDay(now) - calendarDay(date)) / 86_400_000;
  if (daysAgo === 0) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo > 1 && daysAgo < 7) return date.toLocaleDateString("en-GB", { weekday: "long" });
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
};
