import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type FlowType = "post-job" | "post-material" | "register-expert" | null;

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
  profileComplete: boolean;
  role: "user";
}

interface AuthFlowSlice {
  pendingFlow: FlowType;
  pendingFormData: Record<string, unknown> | null;
  redirectPath: string | null;
  otpEmail: string | null;
  setPendingFlow: (
    flow: FlowType,
    data: Record<string, unknown>,
    path: string,
  ) => void;
  setOtpEmail: (email: string) => void;
  clearOtpEmail: () => void;
  clearPendingFlow: () => void;
}

interface UserSlice {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
}

type StoreState = AuthFlowSlice & UserSlice;

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearCurrentUser: () => set({ currentUser: null }),

      pendingFlow: null,
      pendingFormData: null,
      redirectPath: null,
      otpEmail: null,

      setPendingFlow: (flow, data, path) =>
        set({ pendingFlow: flow, pendingFormData: data, redirectPath: path }),

      setOtpEmail: (email) => set({ otpEmail: email }),
      clearOtpEmail: () => set({ otpEmail: null }),

      clearPendingFlow: () =>
        set({
          pendingFlow: null,
          pendingFormData: null,
          redirectPath: null,
          otpEmail: null,
        }),
    }),
    {
      name: "emilist-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        pendingFlow: state.pendingFlow,
        pendingFormData: state.pendingFormData,
        redirectPath: state.redirectPath,
        otpEmail: state.otpEmail,
      }),
    },
  ),
);
