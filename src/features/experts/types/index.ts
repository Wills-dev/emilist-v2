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
  doesntExpire: boolean;
}

export interface Membership {
  organisation: string;
  positionHeld: string;
  startDate: string;
  endDate: string;
  doesntEnd: boolean;
}

export interface Insurance {
  issuingOrganisation: string;
  coverage: string;
  description: string;
}
