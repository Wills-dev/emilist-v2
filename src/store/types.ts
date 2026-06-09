import { CompleteProfileForm } from "@/features/auth/types";
import {
  BusinessProfileState,
  Certification,
  Insurance,
  Membership,
} from "@/features/experts/types";

export type ExpertTab = "profile" | "business-profile" | "experiences";

export interface ProfileSlice {
  profile: CompleteProfileForm;
  profilePreview: string;

  updateProfile: (key: keyof CompleteProfileForm, value: unknown) => void;

  toggleLanguage: (language: string) => void;

  setProfileImage: (file: File | null, preview: string) => void;
}

export interface BusinessSlice {
  business: BusinessProfileState;

  businessImages: File[];

  businessPreviews: string[];

  updateBusiness: (key: keyof BusinessProfileState, value: unknown) => void;

  toggleService: (service: string) => void;

  toggleCoverage: (area: string) => void;
}

export interface ExperienceSlice {
  certifications: Certification[];

  certificationImages: (File | null)[];

  certificationPreviews: string[];

  memberships: Membership[];

  insurances: Insurance[];
}
