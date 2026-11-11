import { axiosInstance } from "@/lib/axiosInstance";
import type { PayoutBank } from "../types/payouts";

export const fetchBanks = async (signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<{ data: { banks: PayoutBank[] } }>("/wallet/fetch-banks", { signal });
  if (!Array.isArray(data.data?.banks)) throw new Error("Unable to read the banks list.");
  // Keep distinct bank names sharing a code, but remove identical API entries.
  const seen = new Set<string>();
  return data.data.banks.filter((bank) => {
    const key = JSON.stringify([bank.bankCode, bank.bankName]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
