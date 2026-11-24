import { formatDeliveryDate } from "./orderDelivery";

export const displayOrderValue = (value: string | number | null | undefined): string => {
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "N/A";
  const text = value?.trim();
  return !text || text === "-" || text === "—" ? "N/A" : text;
};

export const displayOrderDate = (value?: string | null) => formatDeliveryDate(value) || "N/A";

export const displayOrderDateTime = (value?: string | null) => {
  if (!value || !Number.isFinite(new Date(value).getTime())) return "N/A";
  return new Intl.DateTimeFormat("en-NG", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Lagos" }).format(new Date(value));
};
