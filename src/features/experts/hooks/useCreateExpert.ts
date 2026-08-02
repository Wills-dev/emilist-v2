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
import { validateProfileForm } from "@/features/auth/helpers/validateProfileForm";
import { validateBusinessProfile } from "../helpers/validateBusinessProfile";
import { validateCertifications } from "../helpers/validateCertifications";
import { validateMemberships } from "../helpers/validateMemberships";
import { validateInsurances } from "../helpers/validateInsurances";
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

  const { insurances, resetInsurance, validInsurances } = useInsuranceState();

  const { memberships, resetMembership, validMemberships } =
    useMembershipState();

  const {
    certificate,
    certificationsPayload,
    resetCertification,
    validCertifications,
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
    const certValid = validateCertifications(validCertifications);
    const membValid = validateMemberships(validMemberships);
    const insurValid = validateInsurances(validInsurances);

    const isProfileValid = validateProfileForm(profilePayload);
    const isBusinessValid = validateBusinessProfile(business, businessImages);

    if (!isProfileValid || !isBusinessValid) return;
    if (certValid !== true || membValid !== true || insurValid !== true) return;

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
      ...(certValid === true && { certifications: certificationsPayload }),
      ...(membValid === true && { memberships }),
      ...(insurValid === true && { insurances }),
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
