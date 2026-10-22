import type { BusinessData } from "../types";
import { mapBusiness } from "./mapBusiness";

export const normalizeBusinesses = (payload: BusinessData) => {
  if (payload === null) return [];
  const businesses = Array.isArray(payload)
    ? payload
    : "_id" in payload
      ? [payload]
      : payload.businesses;
  if (!Array.isArray(businesses) || businesses.some((business) => !business?._id)) {
    throw new Error("Unable to read your businesses.");
  }
  return businesses.map(mapBusiness);
};
