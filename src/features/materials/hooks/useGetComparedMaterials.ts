"use client";

import { useQuery } from "@tanstack/react-query";

import { getComparedMaterials } from "../api";

export const useGetComparedMaterials = () =>
  useQuery({
    queryKey: ["compared materials"],
    queryFn: getComparedMaterials,
    retry: 1,
  });
