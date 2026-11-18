export interface ExpertCertification { _id?: string; certificate?: string; id: string; issuingOrganisation: string; verificationNumber: string; issuingDate: string; expiringDate: string; isCertificateExpire: boolean; }
export interface ExpertMembership { _id?: string; id: string; organisation: string; positionHeld: string; startDate: string; endDate: string; isMembershipExpire: boolean; }
export interface ExpertInsurance { _id?: string; id: string; issuingOrganisation: string; coverage: string; description: string; }
export interface UserExpertService {
  id: string; service: string; services: string[]; coverageArea: string[]; businessName: string; yearFounded: string; numberOfEmployee: string; businessAddress: string; businessState: string; businessCountry: string; startingPrice: string; currency: string; rateUnit: string; noticePeriod: string; businessDescription: string; image: string; businessImages: string[]; rating: number; reviews: number; level: string; isVerified: boolean;
  certifications: ExpertCertification[]; memberships: ExpertMembership[]; insurances: ExpertInsurance[];
  businessImageFiles?: File[];
  businessImageIds?: Array<string | undefined>;
}
