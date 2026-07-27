"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteMaterialImage, updateMaterial } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

const useRefreshMaterials = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: ["other seller materials"] });
};

export const useUpdateMaterial = (onUpdated?: () => void) => {
  const refreshMaterials = useRefreshMaterials();
  const updateMutation = useMutation({
    mutationFn: updateMaterial,
    onSuccess: () => {
      refreshMaterials();
      toast.success("Material updated successfully.");
      onUpdated?.();
    },
    onError: (error: ApiErrorResponse) => promiseErrorFunction(error),
  });

  return {
    updateMaterial: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};

export const useDeleteMaterialImage = () => {
  const refreshMaterials = useRefreshMaterials();
  const mutation = useMutation({
    mutationFn: deleteMaterialImage,
    onSuccess: refreshMaterials,
    onError: (error: ApiErrorResponse) => promiseErrorFunction(error),
  });

  return {
    deleteExistingImage: mutation.mutateAsync,
    deletingImageId: mutation.isPending
      ? mutation.variables?.imageId
      : undefined,
  };
};

export const useEditMaterial = useUpdateMaterial;
