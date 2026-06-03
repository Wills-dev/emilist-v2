import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type FlowType = "post-job" | "post-material" | "register-expert" | null;
export type ModalType =
  | "login"
  | "register"
  | "verify-otp"
  | "complete-profile"
  | "forgot-password"
  | "reset-password"
  | null;

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
  profileComplete: boolean;
  emailVerified: boolean;
  role: "user";
}

interface AuthFlowSlice {
  pendingFlow: FlowType;
  pendingFormData: Record<string, unknown> | null;
  redirectPath: string | null;
  otpEmail: string | null;
  activeModal: ModalType;
  isModalFlow: boolean;
  openModal: (modal: ModalType) => void;
  closeAllModals: () => void;
  setPendingFlow: (
    flow: FlowType,
    data: Record<string, unknown>,
    path: string,
    isModal?: boolean,
  ) => void;
  setOtpEmail: (email: string) => void;
  clearOtpEmail: () => void;
  clearPendingFlow: () => void;
  setIsModalFlow: (isModal: boolean) => void;
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
      activeModal: null,
      isModalFlow: false,

      openModal: (modal) => set({ activeModal: modal }),
      closeAllModals: () => set({ activeModal: null }),
      setIsModalFlow: (isModal) => set({ isModalFlow: isModal }),

      setPendingFlow: (flow, data, path, isModal = false) =>
        set({
          pendingFlow: flow,
          pendingFormData: data,
          redirectPath: path,
          isModalFlow: isModal,
          activeModal: isModal ? "login" : null,
        }),

      setOtpEmail: (email) => set({ otpEmail: email }),
      clearOtpEmail: () => set({ otpEmail: null }),

      clearPendingFlow: () =>
        set({
          pendingFlow: null,
          pendingFormData: null,
          redirectPath: null,
          otpEmail: null,
          activeModal: null,
          isModalFlow: false,
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
        isModalFlow: state.isModalFlow,
      }),
    },
  ),
);
