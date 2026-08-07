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
  | "terms-prompt"
  | null;

export interface User {
  uniqueId: string;
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  mobile?: string;
  languages?: string[];
  language?: string;
  houseAddress?: string;
  state?: string;
  city?: string;
  country?: string;
  bio?: string;
  image?: string;
  username?: string;
  gender?: string;
  businessMobile?: string;
  whatsappMobile?: string;
  isVerified?: boolean;
  rating?: number;
  totalReviews?: number;
  isProfileComplete: boolean;
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
  otpCountDown: number;
  openModal: (modal: ModalType) => void;
  startPasswordReset: () => void;
  closeAllModals: () => void;
  setPendingFlow: (
    flow: FlowType,
    data: Record<string, unknown>,
    path: string,
    isModal?: boolean,
  ) => void;
  setOtpCountDown: (count: number) => void;
  setOtpEmail: (email: string) => void;
  clearOtpEmail: () => void;
  clearPendingFlow: () => void;
  setIsModalFlow: (isModal: boolean) => void;

  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
}

interface UserSlice {
  currentUser: User | null;
  isAuthInitialized: boolean;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
  setIsAuthInitialized: (isInitialized: boolean) => void;
}

type StoreState = AuthFlowSlice & UserSlice;

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthInitialized: false,
      setCurrentUser: (user) =>
        set({
          currentUser: user,
          isAuthInitialized: true,
        }),
      clearCurrentUser: () => set({ currentUser: null }),
      setIsAuthInitialized: (isInitialized) =>
        set({ isAuthInitialized: isInitialized }),

      pendingFlow: null,
      pendingFormData: null,
      redirectPath: null,
      otpEmail: null,
      activeModal: null,
      isModalFlow: false,
      otpCountDown: 0,

      openModal: (modal) => set({ activeModal: modal }),
      startPasswordReset: () =>
        set({
          activeModal: "forgot-password",
          otpEmail: null,
          otpCountDown: 0,
        }),
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
      setOtpCountDown: (count) => set({ otpCountDown: count }),
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

      termsAccepted: false,
      setTermsAccepted: (value) => set({ termsAccepted: value }),
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
        otpCountDown: state.otpCountDown,
      }),
    },
  ),
);
