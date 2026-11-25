"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useStore, type User } from "@/store/authStore";
import { getBrowserAuthMode } from "@/lib/helpers/authSession";
import { getLoginContinuation } from "../helpers/loginContinuation";

export const useLoginContinuation = () => {
  const router = useRouter();
  const client = useQueryClient();
  return useCallback((user: User, destination: string, fromGoogle = false) => {
    const auth = useStore.getState();
    const next = getLoginContinuation(user, { destination, fromGoogle, isModalFlow: auth.isModalFlow, pendingFlow: auth.pendingFlow, redirectPath: auth.redirectPath });
    if (!user.emailVerified) {
      auth.setOtpEmail(user.email);
      auth.setOtpCountDown(300);
    } else {
      auth.setCurrentUser(user);
      client.setQueriesData({ queryKey: ["currentUser"] }, user);
      client.setQueryData(["currentUser"], user);
      client.setQueryData(["currentUser", getBrowserAuthMode() === "bearer" ? "bearer" : "session"], user);
    }
    if (next.clearPending) auth.clearPendingFlow();
    if (next.modal) auth.openModal(next.modal);
    else auth.closeAllModals();
    if (next.path) {
      if (fromGoogle) router.replace(next.path);
      else router.push(next.path);
    }
  }, [client, router]);
};
