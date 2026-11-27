import { axiosInstance } from "@/lib/axiosInstance";

export interface PublicUserDetails {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  userName?: string;
  uniqueId?: string;
  displayImage?: string;
  bio?: string;
  isVerified?: boolean;
}

export const fetchPublicUser = async (userId: string, signal?: AbortSignal): Promise<PublicUserDetails> => {
  if (!userId.trim()) throw new Error("The user ID is missing.");
  const { data } = await axiosInstance.get<{ data: PublicUserDetails }>(`/auth/user-details/${encodeURIComponent(userId)}`, { signal });
  if (!data?.data || data.data._id !== userId) throw new Error("The user profile response is invalid or belongs to another user.");
  return data.data;
};
