"use client";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { clearClear, createCookie } from "@/lib/helpers/cookie";
import { clearGoogleAuthContext, SESSION_AUTH_COOKIE } from "@/lib/helpers/authSession";
import { readAuthResponse } from "../helpers/authResponse";

export const useSaveAuthSession = () => {
  const client = useQueryClient();
  return useCallback(async (response: unknown, requireVerified = false) => {
    const { user, token } = readAuthResponse(response, requireVerified);
    // A request started before OTP verification must not restore the old user.
    await client.cancelQueries({ queryKey: ["currentUser"] });
    clearGoogleAuthContext();
    clearClear(SESSION_AUTH_COOKIE);
    client.setQueriesData({ queryKey: ["currentUser"] }, user);
    client.setQueryData(["currentUser"], user);
    client.setQueryData(["currentUser", "bearer"], user);
    useStore.getState().setCurrentUser(user);
    // Notify observers after the cache contains the matching, normalized user.
    createCookie("emilistToken", token);
    return user;
  }, [client]);
};
