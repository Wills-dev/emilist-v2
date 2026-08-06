"use client";

import { useQueryClient } from "@tanstack/react-query";

import { getUserFromResponse } from "@/features/auth/helpers/getUserFromResponse";
import { useStore, User } from "@/store/authStore";

export const useSyncCurrentUser = () => {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const queryClient = useQueryClient();

  const syncCurrentUser = (response: unknown, fallback: Partial<User>) => {
    if (!currentUser) return;

    const responseUser = getUserFromResponse(response);
    const nextUser = { ...currentUser, ...fallback, ...responseUser } as User;

    setCurrentUser(nextUser);
    queryClient.setQueryData(["currentUser"], nextUser);
  };

  return { currentUser, syncCurrentUser };
};
