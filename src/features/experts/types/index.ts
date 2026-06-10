import { CompleteProfileForm } from "@/features/auth/types";

export type NoticePeriodType = "day(s)" | "week(s)" | "month(s)";

export interface BusinessProfileState {
  services: string[];
  coverageArea: string[];

  businessName: string;
  yearFounded: string;
  numberOfEmployee: string;

  businessAddress: string;
  businessState: string;
  businessCountry: string;

  startingPrice: string;
  currency: string;
  rateUnit: string;
  noticePeriod: string;

  businessDescription: string;
}

export interface Certification {
  issuingOrganisation: string;
  verificationNumber: string;
  issuingDate: string;
  expiringDate: string;
  isVerified: boolean;
  isCertificateExpire: boolean;

  image?: File | null;
  preview?: string;
}

export interface Membership {
  organisation: string;
  positionHeld: string;
  startDate: string;
  endDate: string;
  isMembershipExpire: boolean;
}

export interface Insurance {
  issuingOrganisation: string;
  coverage: string;
  description: string;
}

export interface BusinessPayloadType {
  services: string[];
  coverageArea: string[];
  businessName: string;
  yearFounded: string;
  numberOfEmployee: string;
  businessAddress: string;
  businessState: string;
  businessCountry: string;
  startingPrice: string;
  currency: string;
  rateUnit: string;
  noticePeriod: string;
  businessDescription: string;
  certifications?: Certification[];
  memberships?: Membership[];
  insurances?: Insurance[];
}

export interface NewExpertFormType {
  profile: CompleteProfileForm;
  displayImage?: File;
  businessImages: File[];
  certificate?: (File | null | undefined)[] | [];
  business: BusinessPayloadType;
}
