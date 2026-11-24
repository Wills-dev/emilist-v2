import { axiosInstance } from "@/lib/axiosInstance";
import type { DashboardOverview, DashboardPeriod } from "../types/api";

export const fetchDashboardOverview = async (period: DashboardPeriod, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<{ data: DashboardOverview }>("/dashboard/overview", { params: { period }, signal });
  return data.data;
};
export const recordReferralShare = (userId: string) => axiosInstance.patch("/auth/add-click", undefined, { params: { service: "shared", userId } });
export const inviteFriend = (email: string) => axiosInstance.get("/auth/invite-user", { params: { email } });
