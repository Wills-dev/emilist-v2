import type { FetchReportInput } from "../types/api";

const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

export const reportParams = (input: FetchReportInput): FetchReportInput => {
  const currency = input.currency;
  if (input.year !== undefined && (!Number.isSafeInteger(input.year) || input.year < 1)) throw new Error("Select a valid report year.");
  if (input.month !== undefined && (!Number.isSafeInteger(input.month) || input.month < 1 || input.month > 12)) throw new Error("Select a valid report month.");
  if (input.range === "custom" && (!input.startDate || !input.endDate)) throw new Error("Select both dates for a custom report.");
  if (input.startDate || input.endDate) {
    if (!input.startDate || !input.endDate || !validDate(input.startDate) || !validDate(input.endDate) || input.startDate > input.endDate) throw new Error("Select a valid start and end date.");
    return { startDate: input.startDate, endDate: input.endDate, currency };
  }
  if (input.range && ["last7days", "last30days", "last90days"].includes(input.range)) return { range: input.range, currency };
  if (input.range === "year") return { year: input.year, range: "year", currency };
  return { ...(input.year ? { year: input.year } : {}), ...(input.month ? { month: input.month } : {}), currency };
};
