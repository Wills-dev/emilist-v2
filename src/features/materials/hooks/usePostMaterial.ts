import { SubmitEvent, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useMutation } from "@tanstack/react-query";

import { postMaterial } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import { useMaterialStore } from "@/store/material/materialStore";
import { useStore } from "@/store/authStore";
import { useProtectedSubmit } from "@/lib/hooks/useProtectedSubmit";
import { PostMaterialPayload } from "../types";
import {
  isMaterialFormComplete,
  validateMaterialForm,
} from "../helpers/validateMaterialForm";
import { validateImage } from "@/lib/helpers/imageValidation";

export const usePostMaterial = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { getPayload, resetForm, setImages } = useMaterialStore(
    useShallow((state) => ({
      getPayload: state.getPayload,
      resetForm: state.resetForm,
      setImages: state.setImages,
    })),
  );

  const { pendingFlow, pendingFormData } = useStore(
    useShallow((state) => ({
      pendingFlow: state.pendingFlow,
      pendingFormData: state.pendingFormData,
    })),
  );

  const currentUser = useStore((state) => state.currentUser);
  const clearPendingFlow = useStore((state) => state.clearPendingFlow);

  const { guardedSubmit } = useProtectedSubmit("post-material", pathname, {
    useModal: true,
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      const error = validateImage(file);
      if (error) return toast.error(error);
    }

    const currentImages = useMaterialStore.getState().images;
    const currentPreviews = useMaterialStore.getState().imagePreviews;
    const previews = files.map((file) => URL.createObjectURL(file));

    setImages([...currentImages, ...files], [...currentPreviews, ...previews]);
    e.target.value = "";
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postMaterial,
    onSuccess: () => {
      resetForm();
      clearPendingFlow();
      toast.success("Material posted successfully!");
      router.push(routes.postMaterialCongrats);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("Failed to post material", error);
      promiseErrorFunction(error);
    },
  });

  useEffect(() => {
    if (pendingFlow !== "post-material" || !pendingFormData || !currentUser)
      return;

    const restoredPayload = pendingFormData as unknown as PostMaterialPayload;
    const hasImages =
      Array.isArray(restoredPayload.images) &&
      restoredPayload.images.length > 0 &&
      restoredPayload.images[0] instanceof File;

    if (
      !hasImages &&
      restoredPayload.images &&
      restoredPayload.images.length > 0
    ) {
      toast.info(
        "Welcome back! Your form was saved. Please re-upload your images.",
      );
      clearPendingFlow();
      return;
    }

    mutate(restoredPayload);
  }, [pendingFlow, pendingFormData, currentUser, clearPendingFlow, mutate]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = getPayload();

    validateMaterialForm(payload);

    if (isMaterialFormComplete(payload)) {
      return;
    }

    guardedSubmit(payload, mutate);
  };

  return { isPending, handleImageChange, handleSubmit };
};
