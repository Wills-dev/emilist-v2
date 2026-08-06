"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ApiErrorResponse } from "@/lib/types/error";
import { updateUserSettings } from "../api";
import { UserSettingsFormValues } from "../types";
import { useSyncCurrentUser } from "./useSyncCurrentUser";
import { User } from "@/store/authStore";

const valuesFromUser = (user: User | null): UserSettingsFormValues => ({
  firstName: user?.firstName ?? "",
  lastName: user?.lastName ?? "",
  countryCode: user?.countryCode ?? "+234",
  mobile: user?.mobile ?? "",
  language: user?.languages?.[0] ?? user?.language ?? "",
  houseAddress: user?.houseAddress ?? "",
  city: user?.city ?? "",
  state: user?.state ?? "",
  country: user?.country ?? "",
  bio: user?.bio ?? "",
});

export const useUserProfileForm = () => {
  const { currentUser, syncCurrentUser } = useSyncCurrentUser();
  const [draftValues, setDraftValues] = useState<UserSettingsFormValues | null>(
    null,
  );
  const [isDetailsEditing, setIsDetailsEditing] = useState(false);
  const [isBioEditing, setIsBioEditing] = useState(false);
  const values = draftValues ?? valuesFromUser(currentUser);

  const updateField = (field: keyof UserSettingsFormValues, value: string) =>
    setDraftValues((current) => ({
      ...(current ?? valuesFromUser(currentUser)),
      [field]: value,
    }));

  const mutation = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: (response) => {
      syncCurrentUser(response, {
        firstName: values.firstName,
        lastName: values.lastName,
        countryCode: values.countryCode,
        mobile: values.mobile,
        houseAddress: values.houseAddress,
        city: values.city,
        state: values.state,
        country: values.country,
        bio: values.bio,
        language: values.language,
        languages: values.language ? [values.language] : [],
      });
      setDraftValues(null);
      setIsDetailsEditing(false);
      setIsBioEditing(false);
      toast.success("Profile updated successfully.");
    },
    onError: (error: ApiErrorResponse) => promiseErrorFunction(error),
  });

  const cancelDetails = () => {
    setDraftValues(null);
    setIsDetailsEditing(false);
  };

  const cancelBio = () => {
    setDraftValues((current) => ({
      ...(current ?? valuesFromUser(currentUser)),
      bio: currentUser?.bio ?? "",
    }));
    setIsBioEditing(false);
  };

  const displayName = useMemo(
    () =>
      [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") ||
      "Emilist User",
    [currentUser],
  );

  return {
    currentUser,
    values,
    updateField,
    displayName,
    isDetailsEditing,
    setIsDetailsEditing,
    isBioEditing,
    setIsBioEditing,
    saveProfile: () => mutation.mutate(values),
    isSavingProfile: mutation.isPending,
    cancelDetails,
    cancelBio,
  };
};
