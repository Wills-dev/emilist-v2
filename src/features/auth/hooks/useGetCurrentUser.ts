import { useEffect, useSyncExternalStore } from "react";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { readCookie } from "@/lib/helpers/cookie";
import { getCurrentUser } from "../api";

const subscribeToCookie = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const useGetCurrentUser = () => {
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const clearCurrentUser = useStore((state) => state.clearCurrentUser);
  const setIsAuthInitialized = useStore(
    (state) => state.setIsAuthInitialized,
  );
  const hasCheckedToken = useSyncExternalStore(
    subscribeToCookie,
    getClientSnapshot,
    getServerSnapshot,
  );
  const token = useSyncExternalStore(
    subscribeToCookie,
    () => readCookie("emilistToken"),
    () => undefined,
  );

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: hasCheckedToken && Boolean(token),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (hasCheckedToken && !token) {
      clearCurrentUser();
      setIsAuthInitialized(true);
      return;
    }

    if (query.isSuccess && query.data) {
      setCurrentUser(query?.data?.userData);
    }
    if (query.isError) {
      clearCurrentUser();
    }
    if (query.isSuccess || query.isError) {
      setIsAuthInitialized(true);
    }
  }, [
    clearCurrentUser,
    hasCheckedToken,
    query.data,
    query.isError,
    query.isSuccess,
    setCurrentUser,
    setIsAuthInitialized,
    token,
  ]);

  return query;
};
