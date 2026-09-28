"use client";

import React from "react";

import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useGetCurrentUser();

  return <>{children}</>;
};

export default AuthProvider;
