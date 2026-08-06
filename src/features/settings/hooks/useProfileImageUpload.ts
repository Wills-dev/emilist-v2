"use client";

import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { getUserFromResponse } from "@/features/auth/helpers/getUserFromResponse";
import { validateImage } from "@/lib/helpers/imageValidation";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ApiErrorResponse } from "@/lib/types/error";
import { uploadUserProfileImage } from "../api";
import { useSyncCurrentUser } from "./useSyncCurrentUser";

export const useProfileImageUpload = () => {
  const { currentUser, syncCurrentUser } = useSyncCurrentUser();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState("");
  const photoPreview = selectedPhotoPreview || currentUser?.image || "";

  const mutation = useMutation({
    mutationFn: uploadUserProfileImage,
    onSuccess: (response) => {
      const responseUser = getUserFromResponse(response);
      const responseImage =
        responseUser?.image ||
        (response as { data?: { image?: string }; image?: string })?.data?.image ||
        (response as { image?: string })?.image ||
        photoPreview;

      syncCurrentUser(response, { image: responseImage });
      setPhotoFile(null);
      setSelectedPhotoPreview("");
      toast.success("Display photo updated successfully.");
    },
    onError: (error: ApiErrorResponse) => promiseErrorFunction(error),
  });

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageError = validateImage(file);
    if (imageError) {
      toast.error(imageError);
      return;
    }

    if (selectedPhotoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(selectedPhotoPreview);
    }
    setPhotoFile(file);
    setSelectedPhotoPreview(URL.createObjectURL(file));
  };

  const cancelPhoto = () => {
    if (selectedPhotoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(selectedPhotoPreview);
    }
    setPhotoFile(null);
    setSelectedPhotoPreview("");
  };

  return {
    photoFile,
    photoPreview,
    handlePhotoChange,
    savePhoto: () => photoFile && mutation.mutate(photoFile),
    cancelPhoto,
    isSavingPhoto: mutation.isPending,
  };
};
