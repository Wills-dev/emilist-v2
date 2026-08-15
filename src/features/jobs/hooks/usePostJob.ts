import { SubmitEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { postJob } from "../api";
import { MAX_POST_JOB_FILES } from "../constants/postJob";
import { buildPostJobPayload } from "../helpers/buildPostJobPayload";
import {
  PostJobDetailsValidation,
  PostJobMilestonesValidation,
  validatePostJobDetails,
  validatePostJobMilestones,
} from "../helpers/validatePostJob";
import { PostJobStep, PostJobWriteDto } from "../types/postJob";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import { validateImage } from "@/lib/helpers/imageValidation";
import { useProtectedSubmit } from "@/lib/hooks/useProtectedSubmit";
import { ApiErrorResponse } from "@/lib/types/error";
import { useStore } from "@/store/authStore";
import { usePostJobStore } from "@/store/job/postJobStore";

const emptyDetailsValidation: PostJobDetailsValidation = {
  isValid: true,
  errors: {},
};

const revokePreviews = (previews: string[]) => {
  previews.forEach((preview) => URL.revokeObjectURL(preview));
};

export const usePostJob = (initialExpertId?: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const storeState = usePostJobStore();
  const currentUser = useStore((state) => state.currentUser);
  const pendingFlow = useStore((state) => state.pendingFlow);
  const pendingFormData = useStore((state) => state.pendingFormData);
  const clearPendingFlow = useStore((state) => state.clearPendingFlow);
  const [detailsAttempted, setDetailsAttempted] = useState(false);
  const [milestonesAttempted, setMilestonesAttempted] = useState(false);
  const resumeStartedRef = useRef(false);
  const uploadRestoreNoticeShownRef = useRef(false);
  const { guardedSubmit } = useProtectedSubmit("post-job", pathname, {
    useModal: true,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      revokePreviews(usePostJobStore.getState().previews);
      usePostJobStore.getState().resetForm();
      clearPendingFlow();
      toast.success("Job posted successfully!");
      router.push(routes.postJobCongrats);
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  useEffect(() => {
    const currentExpertId = usePostJobStore.getState().expertId;
    const nextExpertId = initialExpertId?.trim() ?? "";
    if (currentExpertId === nextExpertId) return;
    usePostJobStore.getState().setField("expertId", nextExpertId);
    usePostJobStore.getState().setStep(1);
  }, [initialExpertId]);

  useEffect(() => {
    const state = usePostJobStore.getState();
    if (
      uploadRestoreNoticeShownRef.current ||
      state.savedFileCount === 0 ||
      state.files.length > 0
    ) {
      return;
    }

    uploadRestoreNoticeShownRef.current = true;
    toast.info(
      "Your saved job draft included images. Please re-upload them before posting.",
    );
    state.setFiles([], []);
  }, []);

  useEffect(() => {
    if (
      resumeStartedRef.current ||
      pendingFlow !== "post-job" ||
      !pendingFormData ||
      !currentUser?.isProfileComplete
    ) {
      return;
    }

    const restoredPayload = pendingFormData as unknown as PostJobWriteDto;
    const hasLostFiles =
      Array.isArray(restoredPayload.files) &&
      restoredPayload.files.some((file) => !(file instanceof File));

    if (hasLostFiles) {
      resumeStartedRef.current = true;
      if (!uploadRestoreNoticeShownRef.current) {
        toast.info(
          "Welcome back! Your job draft was saved. Please re-upload your images before posting.",
        );
      }
      clearPendingFlow();
      return;
    }

    resumeStartedRef.current = true;
    clearPendingFlow();
    mutate(restoredPayload);
  }, [clearPendingFlow, currentUser, mutate, pendingFlow, pendingFormData]);

  const currentDraft = storeState.getDraft();
  const detailsValidation = detailsAttempted
    ? validatePostJobDetails(currentDraft)
    : emptyDetailsValidation;
  const milestonesValidation: PostJobMilestonesValidation | undefined =
    milestonesAttempted
      ? validatePostJobMilestones(currentDraft)
      : undefined;

  const goToStep = (step: PostJobStep) => {
    storeState.setStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.requestAnimationFrame(() => {
      document
        .getElementById(step === 1 ? "job-category" : "milestones-title")
        ?.focus();
    });
  };

  const continueToMilestones = () => {
    const validation = validatePostJobDetails(
      usePostJobStore.getState().getDraft(),
    );
    setDetailsAttempted(true);
    if (!validation.isValid) {
      toast.error(validation.firstError);
      return false;
    }

    goToStep(2);
    return true;
  };

  const selectStep = (step: PostJobStep) => {
    if (step === 1) {
      goToStep(1);
      return;
    }
    continueToMilestones();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const current = usePostJobStore.getState();

    if (current.files.length + selectedFiles.length > MAX_POST_JOB_FILES) {
      toast.error(`You can upload up to ${MAX_POST_JOB_FILES} images.`);
      event.target.value = "";
      return;
    }

    for (const file of selectedFiles) {
      const error = validateImage(file);
      if (error) {
        toast.error(error);
        event.target.value = "";
        return;
      }
    }

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    current.setFiles(
      [...current.files, ...selectedFiles],
      [...current.previews, ...previews],
    );
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    const state = usePostJobStore.getState();
    const preview = state.previews[index];
    if (preview) URL.revokeObjectURL(preview);
    state.removeFile(index);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usePostJobStore.getState().step === 1) {
      continueToMilestones();
      return;
    }

    const state = usePostJobStore.getState();
    const draft = state.getDraft();
    const nextDetailsValidation = validatePostJobDetails(draft);
    const nextMilestonesValidation = validatePostJobMilestones(draft);
    setDetailsAttempted(true);
    setMilestonesAttempted(true);

    if (!nextDetailsValidation.isValid) {
      toast.error(nextDetailsValidation.firstError);
      goToStep(1);
      return;
    }

    if (!nextMilestonesValidation.isValid) {
      Object.keys(nextMilestonesValidation.errors).forEach((milestoneId) => {
        const milestone = usePostJobStore
          .getState()
          .milestones.find((item) => item.id === milestoneId);
        if (milestone && !milestone.isExpanded) {
          usePostJobStore.getState().toggleMilestone(milestoneId);
        }
      });
      toast.error(nextMilestonesValidation.firstError);
      return;
    }

    try {
      const payload = buildPostJobPayload(state.getFormData());
      guardedSubmit(payload, mutate);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Please review the milestone allocation.",
      );
    }
  };

  return {
    currentStep: storeState.step,
    detailsValidation,
    handleImageChange,
    handleSubmit,
    isPending,
    milestonesValidation,
    removeImage,
    selectStep,
  };
};
