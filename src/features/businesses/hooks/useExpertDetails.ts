"use client";

import { useBusinessProfile } from "./useBusinessProfile";
import { mapBusinessExpertDetails } from "../helpers/mapBusinessExpertDetails";

export const useExpertDetails = (businessId: string, enabled = true) => {
  const query = useBusinessProfile(businessId, enabled);
  const retry = () => { void query.refetch(); };
  return { ...query, retry, details: query.data ? mapBusinessExpertDetails(query.data) : undefined };
};
