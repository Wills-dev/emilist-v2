"use client";

import { useEffect, useRef, useState } from "react";

import PostJobActions from "../PostJobActions/PostJobActions";
import PostJobDetailsStep from "../PostJobDetailsStep/PostJobDetailsStep";
import PostJobHeader from "../PostJobHeader/PostJobHeader";
import PostJobMilestonesStep from "../PostJobMilestonesStep/PostJobMilestonesStep";
import { usePostJob } from "../../hooks/usePostJob";
import { usePostJobStore } from "@/store/job/postJobStore";

const HydratedPostJobForm = ({
  initialExpertId,
}: {
  initialExpertId?: string;
}) => {
  const {
    currentStep,
    detailsValidation,
    handleImageChange,
    handleSubmit,
    isPending,
    milestonesValidation,
    removeImage,
    selectStep,
  } = usePostJob(initialExpertId);

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="w-full space-y-12 pb-16"
    >
      <PostJobHeader
        currentStep={currentStep}
        onSelectStep={selectStep}
      />

      {currentStep === 1 ? (
        <PostJobDetailsStep
          errors={detailsValidation.errors}
          onAddImages={handleImageChange}
          onRemoveImage={removeImage}
        />
      ) : (
        <PostJobMilestonesStep validation={milestonesValidation} />
      )}

      <PostJobActions
        currentStep={currentStep}
        isPending={isPending}
        onBack={() => selectStep(1)}
      />
    </form>
  );
};

const PostJobForm = ({ initialExpertId }: { initialExpertId?: string }) => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const initialExpertIdRef = useRef(initialExpertId);

  useEffect(() => {
    let isMounted = true;

    Promise.resolve(usePostJobStore.persist.rehydrate()).finally(() => {
      if (!isMounted) return;

      const state = usePostJobStore.getState();
      const nextExpertId = initialExpertIdRef.current?.trim() ?? "";
      if (state.expertId !== nextExpertId) {
        state.setField("expertId", nextExpertId);
        state.setStep(1);
      }
      setHasHydrated(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!hasHydrated) {
    return (
      <div
        className="min-h-160 w-full animate-pulse rounded-2xl bg-[#F7F8F7]"
        aria-label="Loading your job draft"
        aria-busy="true"
      />
    );
  }

  return <HydratedPostJobForm initialExpertId={initialExpertId} />;
};

export default PostJobForm;
