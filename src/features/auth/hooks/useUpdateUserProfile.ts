import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { routes } from "@/lib/helpers/routes";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { useUpdateUserProfileState } from "./useUpdateUserProfileState";
import { updateProfileRequest } from "../api/user";
import { validateProfileForm } from "../helpers/validateProfileForm";

export const useUpdateUserProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const {
    form,
    imagePreview,
    handleChange,
    handleImageChange,
    deleteImage,
    toggleLanguage,
    setImagePreview,
    setForm,
    isFormComplete,
  } = useUpdateUserProfileState();

  const { redirectPath, isModalFlow } = useStore(
    useShallow((state) => ({
      redirectPath: state.redirectPath,
      isModalFlow: state.isModalFlow,
    })),
  );

  const currentUser = useStore((state) => state.currentUser);
  const closeAllModals = useStore((state) => state.closeAllModals);

  useEffect(() => {
    if (!currentUser) return;

    setForm((prev) => ({
      ...prev,
      firstName: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      countryCode: currentUser.countryCode ?? "+234",
      mobile: currentUser.mobile ?? "",
      language: currentUser.language ?? [],
      houseAddress: currentUser.houseAddress ?? "",
      state: currentUser.state ?? "",
      city: currentUser.city ?? "",
      country: currentUser.country ?? "",
      bio: currentUser.bio ?? "",
    }));

    setImagePreview(currentUser.image ?? "");
  }, [currentUser, setForm, setImagePreview]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: () => {
      toast.success("Profile updated successfully.");

      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });

      const queryRedirect = searchParams.get("redirect");
      const destination = redirectPath || queryRedirect || routes.dashboard;

      if (isModalFlow) {
        closeAllModals();
        return;
      } else router.push(destination);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error updating user profile in", error);
      promiseErrorFunction(error);
    },
  });

  const handleUpdateProfile = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateProfileForm(form)) return;

    mutate(form);
  };

  return {
    isPending,
    handleUpdateProfile,
    form,
    imagePreview,
    handleChange,
    handleImageChange,
    deleteImage,
    toggleLanguage,
    isFormComplete,
  };
};
