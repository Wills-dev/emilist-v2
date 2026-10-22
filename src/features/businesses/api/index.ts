import { axiosInstance } from "@/lib/axiosInstance";
import { normalizeBusinesses } from "../helpers/normalizeBusinesses";
import type { BusinessData } from "../types";


export const fetchUserBusinesses = async (signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<{ data: BusinessData }>(
    "/business/fetch-user-business", { signal },
  );
  return normalizeBusinesses(data.data);
};
