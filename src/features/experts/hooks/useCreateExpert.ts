import { useShallow } from "zustand/react/shallow";

import { useExpertStore } from "@/store/expert/expertStore";

import { useUpdateUserProfileState } from "@/features/auth/hooks/useUpdateUserProfileState";

import { useBusinessProfileState } from "./useBusinessProfileState";
import { toast } from "sonner";
import { useCertificationState } from "./useCertificationState";
import { useInsuranceState } from "./useInsuranceState";
import { useMembershipState } from "./useMembershipState";

export const useCreateExpert = () => {
  const { profile } = useUpdateUserProfileState();

  const { business, businessImages } = useBusinessProfileState();

  const { insurances } = useInsuranceState();

  const { memberships } = useMembershipState();

  const { certificationImages, certifications } = useCertificationState();

  return {};
};
