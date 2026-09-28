"use client";

import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import { routes } from "@/lib/helpers/routes";
import { useEditJobStore } from "@/store/job/editJobStore";
import PostJobActions from "../PostJobActions/PostJobActions";
import PostJobDetailsStep from "../PostJobDetailsStep/PostJobDetailsStep";
import PostJobHeader from "../PostJobHeader/PostJobHeader";
import PostJobMilestonesStep from "../PostJobMilestonesStep/PostJobMilestonesStep";
import { useEditJob } from "../../hooks/useEditJob";

const EditJobForm = ({ jobId }: { jobId: string }) => {
  const {
    currentStep,
    detailsValidation,
    existingFiles,
    handleImageChange,
    handleSubmit,
    isJobError,
    isJobLoading,
    isReady,
    isSubmitting,
    milestonesValidation,
    refetchJob,
    removeExistingFile,
    removeImage,
    removingFileId,
    selectStep,
  } = useEditJob(jobId);

  if (isJobError) {
    return (
      <EmptyState
        title="Unable to load this job"
        description="Please check your connection and try again."
        actionLabel="Retry"
        onAction={() => refetchJob()}
      />
    );
  }

  if (isJobLoading || !isReady) {
    return (
      <div
        className="min-h-160 w-full animate-pulse rounded-2xl bg-[#F7F8F7]"
        aria-label="Loading job details"
        aria-busy="true"
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="w-full space-y-12 pb-16"
    >
      <PostJobHeader
        currentStep={currentStep}
        onSelectStep={selectStep}
        title="Edit job"
        description="Update your project details"
      />

      {currentStep === 1 ? (
        <PostJobDetailsStep
          errors={detailsValidation.errors}
          onAddImages={handleImageChange}
          onRemoveImage={removeImage}
          existingFiles={existingFiles}
          onRemoveExistingFile={removeExistingFile}
          removingExistingFileId={removingFileId}
          useStore={useEditJobStore}
        />
      ) : (
        <PostJobMilestonesStep
          validation={milestonesValidation}
          useStore={useEditJobStore}
        />
      )}

      <PostJobActions
        currentStep={currentStep}
        isPending={isSubmitting}
        onBack={() => selectStep(1)}
        submitLabel="Save changes"
        cancelHref={routes.dashboardLinks.jobInfo(jobId)}
        cancelLabel="Back to job"
      />
    </form>
  );
};

export default EditJobForm;
