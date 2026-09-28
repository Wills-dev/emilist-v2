import { SubmitEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeJobFile, updateJob } from "../api";
import { MAX_POST_JOB_FILES } from "../constants/postJob";
import { buildPostJobPayload } from "../helpers/buildPostJobPayload";
import {
  mapJobExistingFiles,
  mapJobToEditDraft,
} from "../helpers/mapJobToEditDraft";
import {
  PostJobDetailsValidation,
  PostJobMilestonesValidation,
  validatePostJobDetails,
  validatePostJobMilestones,
} from "../helpers/validatePostJob";
import { jobKeys } from "../queries/jobKeys";
import { PostJobStep } from "../types/postJob";
import { useGetJobForEdit } from "./useGetJobForEdit";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import { validateImage } from "@/lib/helpers/imageValidation";
import { ApiErrorResponse } from "@/lib/types/error";
import { useEditJobStore } from "@/store/job/editJobStore";
import { useEditJobMetaStore } from "@/store/job/editJobMetaStore";

const emptyDetailsValidation: PostJobDetailsValidation = {
  isValid: true,
  errors: {},
};

const revokePreviews = (previews: string[]) => {
  previews.forEach((preview) => URL.revokeObjectURL(preview));
};

export const useEditJob = (jobId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const storeState = useEditJobStore();
  const { hydratedJobId, existingFiles } = useEditJobMetaStore();
  const {
    data: job,
    isPending: isJobLoading,
    isError: isJobError,
    refetch: refetchJob,
  } = useGetJobForEdit(jobId);

  const [removingFileId, setRemovingFileId] = useState<string | null>(null);
  const [detailsAttempted, setDetailsAttempted] = useState(false);
  const [milestonesAttempted, setMilestonesAttempted] = useState(false);

  useEffect(() => {
    if (useEditJobMetaStore.getState().hydratedJobId === jobId) return;
    if (!job || job._id !== jobId) return;

    useEditJobStore.setState({
      ...mapJobToEditDraft(job),
      files: [],
      previews: [],
      savedFileCount: 0,
    });
    useEditJobMetaStore.getState().setHydrated(jobId, mapJobExistingFiles(job));
  }, [job, jobId]);

  useEffect(() => {
    return () => {
      revokePreviews(useEditJobStore.getState().previews);
      useEditJobStore.getState().resetForm();
      useEditJobMetaStore.getState().reset();
    };
  }, [jobId]);

  const { mutate: submitUpdate, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: ReturnType<typeof buildPostJobPayload>) =>
      updateJob({ jobId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
      toast.success("Job updated successfully!");
      router.push(routes.dashboardLinks.jobInfo(jobId));
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const { mutate: submitRemoveFile } = useMutation({
    mutationFn: (fileId: string) => removeJobFile({ jobId, fileId }),
    onMutate: (fileId: string) => setRemovingFileId(fileId),
    onSuccess: (_data, fileId) => {
      useEditJobMetaStore.getState().removeExistingFile(fileId);
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
      toast.success("Image removed.");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
    onSettled: () => setRemovingFileId(null),
  });

  const currentDraft = storeState.getDraft();
  const detailsValidation = detailsAttempted
    ? validatePostJobDetails(currentDraft)
    : emptyDetailsValidation;
  const milestonesValidation: PostJobMilestonesValidation | undefined =
    milestonesAttempted
      ? validatePostJobMilestones(currentDraft)
      : undefined;

  const goToStep = (step: PostJobStep) => {
    useEditJobStore.getState().setStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.requestAnimationFrame(() => {
      document
        .getElementById(step === 1 ? "job-category" : "milestones-title")
        ?.focus();
    });
  };

  const continueToMilestones = () => {
    const validation = validatePostJobDetails(
      useEditJobStore.getState().getDraft(),
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
    const current = useEditJobStore.getState();
    const totalAfter =
      existingFiles.length + current.files.length + selectedFiles.length;

    if (totalAfter > MAX_POST_JOB_FILES) {
      toast.error(`You can have up to ${MAX_POST_JOB_FILES} images in total.`);
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
    const state = useEditJobStore.getState();
    const preview = state.previews[index];
    if (preview) URL.revokeObjectURL(preview);
    state.removeFile(index);
  };

  const removeExistingFile = (fileId: string) => {
    submitRemoveFile(fileId);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (useEditJobStore.getState().step === 1) {
      continueToMilestones();
      return;
    }

    const state = useEditJobStore.getState();
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
        const milestone = useEditJobStore
          .getState()
          .milestones.find((item) => item.id === milestoneId);
        if (milestone && !milestone.isExpanded) {
          useEditJobStore.getState().toggleMilestone(milestoneId);
        }
      });
      toast.error(nextMilestonesValidation.firstError);
      return;
    }

    try {
      const payload = buildPostJobPayload(state.getFormData());
      submitUpdate(payload);
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
    existingFiles,
    handleImageChange,
    handleSubmit,
    isJobError,
    isJobLoading,
    isReady: hydratedJobId === jobId,
    isSubmitting,
    milestonesValidation,
    refetchJob,
    removeExistingFile,
    removeImage,
    removingFileId,
    selectStep,
  };
};
