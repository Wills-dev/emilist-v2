export const formatNoticePeriod = (value: string) => {
  const period = value.trim();
  if (!period) return "—";
  const days = Number(period);
  return Number.isFinite(days) ? `${days} ${days === 1 ? "day" : "days"}` : period;
};
