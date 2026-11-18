"use client";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { getComparedMaterials } from "../api";

export const useGetComparedMaterials = () => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: ["compared materials", userId],
    queryFn: getComparedMaterials,
    enabled: Boolean(userId),
    retry: 1,
  });

};
