import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createProfileSlice } from "./profile.slice";
import { createBusinessSlice } from "./business.slice";
import { createTabSlice, TabSlice } from "./tab.slice";
import {
  CertificationSlice,
  BusinessSlice,
  ProfileSlice,
  MembershipSlice,
  InsuranceSlice,
} from "../types/expert";
import { createCertificationSlice } from "./certification.slice";
import { createMembershipSlice } from "./membership.slice";
import { createInsuranceSlice } from "./insurance.slice";
import { Certification } from "@/features/experts/types";
import { CompleteProfileForm } from "@/features/auth/types";

export const useExpertStore = create<
  ProfileSlice &
    BusinessSlice &
    CertificationSlice &
    MembershipSlice &
    InsuranceSlice &
    TabSlice
>()(
  persist(
    (...a) => ({
      ...createProfileSlice(...a),
      ...createBusinessSlice(...a),
      ...createCertificationSlice(...a),
      ...createMembershipSlice(...a),
      ...createInsuranceSlice(...a),
      ...createTabSlice(...a),
    }),
    {
      name: "expert-registration",
      partialize: (state) => {
        type PersistedCertification = Omit<Certification, "image" | "preview">;
        type PersistedProfile = Omit<CompleteProfileForm, "image">;

        return {
          ...state,

          profile: (({ image, ...rest }) => rest)(
            state.profile,
          ) as PersistedProfile,
          profilePreview: undefined,

          certifications: state.certifications.map(
            ({ image, preview, ...rest }): PersistedCertification => rest,
          ),

          businessImages: undefined,
          businessPreviews: undefined,
        };
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        state.profile = {
          ...state.profile,
          image: null,
        };

        state.certifications = state.certifications.map((c) => ({
          image: null,
          preview: "",
          ...c,
        }));

        state.businessImages = [];
        state.businessPreviews = [];
      },
    },
  ),
);
