import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useMutation } from "@tanstack/react-query";

import { useUpdateUserProfileState } from "@/features/auth/hooks/useUpdateUserProfileState";
import { useBusinessProfileState } from "./useBusinessProfileState";
import { useCertificationState } from "./useCertificationState";
import { useInsuranceState } from "./useInsuranceState";
import { useMembershipState } from "./useMembershipState";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { createExpert } from "../api";
import { getProfileFormError } from "@/features/auth/helpers/validateProfileForm";
import { getBusinessProfileError } from "../helpers/validateBusinessProfile";
import { getExperienceError } from "../helpers/expertExperienceValidation";
import { reportFormError } from "@/lib/helpers/formValidation";
import { useExpertStore } from "@/store/expert/expertStore";
import { useStore } from "@/store/authStore";
import { useProtectedSubmit } from "@/lib/hooks/useProtectedSubmit";
import { BusinessPayloadType, NewExpertFormType } from "../types";
import { routes } from "@/lib/helpers/routes";
import { useExpertTabs } from "./useExpertTabs";
import { removeNumberCommas } from "@/lib/helpers/formatNumbers";

export const useCreateExpert = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { pendingFlow, pendingFormData, currentUser } = useStore(
    useShallow((state) => ({
      pendingFlow: state.pendingFlow,
      pendingFormData: state.pendingFormData,
      currentUser: state.currentUser,
    })),
  );

  const clearPendingFlow = useStore((state) => state.clearPendingFlow);

  const { switchTab } = useExpertTabs();

  const { profilePayload, displayImage } = useUpdateUserProfileState();

  const { business, businessImages, resetBusiness } = useBusinessProfileState();

  const { resetInsurance, validInsurances } = useInsuranceState();

  const { resetMembership, validMemberships } =
    useMembershipState();

  const {
    certificate,
    certificationsPayload,
    resetCertification,
  } = useCertificationState();

  const { guardedSubmit } = useProtectedSubmit("register-expert", pathname, {
    useModal: true,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createExpert,
    onSuccess: () => {
      resetBusiness();
      resetCertification();
      resetInsurance();
      resetMembership();
      clearPendingFlow();

      router.push(routes.congrats);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error creating new expert", error);
      promiseErrorFunction(error);
    },
  });

  useEffect(() => {
    if (pendingFlow !== "register-expert" || !pendingFormData) return;

    if (!currentUser) return;

    if (businessImages.length === 0) {
      switchTab("profile");
      toast.info(
        "Almost there! Please re-attach your images to complete expert registration.",
      );
      clearPendingFlow();
      return;
    }

    mutate(pendingFormData as unknown as NewExpertFormType);
  }, [
    mutate,
    pendingFlow,
    pendingFormData,
    currentUser,
    businessImages.length,
    switchTab,
    clearPendingFlow,
  ]);

  const handleSubmit = () => {
    if (isPending) return;
    const state = useExpertStore.getState();
    const profileError = pathname.startsWith("/dashboard/") && currentUser?.isProfileComplete ? undefined : getProfileFormError(profilePayload);
    if (profileError) { state.setTab("profile"); reportFormError(profileError.field, profileError.message); return; }
    const businessError = getBusinessProfileError(business, businessImages);
    if (businessError) { state.setTab("business-profile"); reportFormError(businessError.field, businessError.message); return; }
    const experienceError = getExperienceError(state.certifications, state.memberships, state.insurances);
    if (experienceError) {
      const { kind, index } = experienceError;
      if (kind === "certificate" && !state.certificationView[index]) state.toggleCertificationView(index);
      if (kind === "membership" && !state.membershipView[index]) state.toggleMembershipView(index);
      if (kind === "insurance" && !state.insuranceView[index]) state.toggleInsuranceView(index);
      reportFormError(experienceError.field, experienceError.message);
      return;
    }

    const {
      services,
      coverageArea,
      businessName,
      yearFounded,
      numberOfEmployee,
      businessAddress,
      businessState,
      businessCountry,
      startingPrice,
      currency,
      rateUnit,
      noticePeriod,
      businessDescription,
    } = business;

    const businessPayload: BusinessPayloadType = {
      services,
      coverageArea,
      businessName,
      yearFounded,
      numberOfEmployee,
      businessAddress,
      businessState,
      businessCountry,
      startingPrice: removeNumberCommas(startingPrice),
      currency,
      rateUnit,
      noticePeriod,
      businessDescription,
      certifications: certificationsPayload,
      memberships: validMemberships,
      insurances: validInsurances,
    };

    const payload: NewExpertFormType = {
      profile: profilePayload,
      business: businessPayload,
      businessImages,
      certificate,
      ...(displayImage && { displayImage }),
    };

    guardedSubmit(payload, mutate);
  };

  return { handleSubmit, isPending };
};
