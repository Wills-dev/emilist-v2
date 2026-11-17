export const messageDateLabel = (value: string, now = new Date()) => {
  const date = new Date(value);
  if (date.toDateString() === now.toDateString()) return "Today";
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};
