import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createProfileSlice, ProfileSlice } from "./profile.slice";
import { createBusinessSlice, BusinessSlice } from "./business.slice";
import { createCredentialsSlice, CredentialsSlice } from "./credentials.slice";
import { createTabSlice, TabSlice } from "./tab.slice";

export const useExpertStore = create<
  ProfileSlice & BusinessSlice & CredentialsSlice & TabSlice
>()(
  persist(
    (...a) => ({
      ...createProfileSlice(...a),
      ...createBusinessSlice(...a),
      ...createCredentialsSlice(...a),
      ...createTabSlice(...a),
    }),
    {
      name: "expert-registration",
    },
  ),
);
