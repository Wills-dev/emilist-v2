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
    },
  ),
);
