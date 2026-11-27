"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicUser } from "../api/fetchPublicUser";
import { mapPublicUser } from "../helpers/mapPublicUser";
import type { ProfileKind } from "../types";

export const usePublicUserProfile = (userId: string, kind: ProfileKind) => useQuery({
  queryKey: ["public-user-profile", userId],
  queryFn: ({ signal }) => fetchPublicUser(userId, signal),
  select: (user) => mapPublicUser(user, kind),
  enabled: Boolean(userId.trim()),
  staleTime: 60_000,
  retry: 1,
});
