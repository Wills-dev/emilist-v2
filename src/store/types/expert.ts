import { CompleteProfileForm } from "@/features/auth/types";
import {
  BusinessProfileState,
  Certification,
  Insurance,
  Membership,
} from "@/features/experts/types";

export type ExpertTab = "profile" | "business-profile" | "experiences";

export type ProfileSlice = {
  profile: CompleteProfileForm;

  profilePreview: string;

  updateProfile: (key: keyof CompleteProfileForm, value: unknown) => void;

  setProfile: (profile: CompleteProfileForm) => void;

  toggleLanguage: (language: string) => void;

  setProfileImage: (file: File | null, preview: string) => void;

  deleteImage: () => void;

  resetProfileForm: () => void;
};

export type BusinessSlice = {
  business: BusinessProfileState;
  setBusiness: (profile: BusinessProfileState) => void;

  businessImages: File[];

  businessPreviews: string[];

  useProfileAddress: boolean;
  setUseProfileAddress: (value: boolean) => void;

  updateBusiness: (key: keyof BusinessProfileState, value: unknown) => void;
  toggleService: (value: string) => void;
  toggleCoverage: (value: string) => void;

  addBusinessImages: (files: File[], preview: string[]) => void;
  removeBusinessImage: (index: number) => void;
};

export type CertificationSlice = {
  certifications: Certification[] | [];
  certificationImages: (File | null)[];
  certificationPreview: string[];
  certificationView: boolean[];

  addCertification: () => void;
  updateCertification: (
    i: number,
    key: keyof Certification,
    value: unknown,
  ) => void;
  toggleCertificationView: (i: number) => void;
  removeCertification: (i: number) => void;
  updateCertificationImage: (
    i: number,
    file: File | null,
    preview: string,
  ) => void;
  removeCertificationImage: (index: number) => void;
};

export type MembershipSlice = {
  memberships: Membership[];
  membershipView: boolean[];

  addMembership: () => void;
  updateMembership: (i: number, key: keyof Membership, value: unknown) => void;
  removeMembership: (i: number) => void;
  toggleMembershipView: (i: number) => void;
};

export type InsuranceSlice = {
  insurances: Insurance[];
  insuranceView: boolean[];

  addInsurance: () => void;
  updateInsurance: (i: number, key: keyof Insurance, value: unknown) => void;
  removeInsurance: (i: number) => void;
  toggleInsuranceView: (i: number) => void;
};
