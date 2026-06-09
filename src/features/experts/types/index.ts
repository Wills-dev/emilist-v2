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
}

export interface Membership {
  organisation: string;
  positionHeld: string;
  startDate: string;
  endDate: string;
}

export interface Insurance {
  issuingOrganisation: string;
  coverage: string;
  description: string;
}

export interface BusinessFormWrapperProps {
  updateBusiness: (key: keyof BusinessProfileState, value: unknown) => void;
  toggleService: (value: string) => void;
  toggleCoverage: (value: string) => void;
  removeBusinessImage: (index: number) => void;
  handleBusinessImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  business: BusinessProfileState;
  businessPreviews: string[];
  switchTab: (tab: "business-profile" | "profile" | "experiences") => void;
  handleSameAsProfile: (value: boolean) => void;
  isBusinessFormFilled: boolean;
  useProfileAddress: boolean;
}

export interface BusinessSetupProps {
  updateBusiness: (key: keyof BusinessProfileState, value: unknown) => void;
  toggleService: (value: string) => void;
  toggleCoverage: (value: string) => void;
  removeBusinessImage: (index: number) => void;
  handleBusinessImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  business: BusinessProfileState;
  businessPreviews: string[];
  handleSameAsProfile: (value: boolean) => void;
  useProfileAddress: boolean;
}
