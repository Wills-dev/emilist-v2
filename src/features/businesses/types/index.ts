import type { UserExpertService } from "@/features/settings/types/expertService";

type NumericBusinessField = "numberOfEmployee" | "startingPrice" | "noticePeriod";

export interface BusinessDto extends Partial<Omit<UserExpertService,
  "id" | "businessImages" | "reviews" | NumericBusinessField
>> {
  _id: string;
  displayImage?: string;
  numberOfEmployee?: string | number;
  startingPrice?: string | number;
  noticePeriod?: string | number;
  businessImages?: Array<string | { imageUrl: string; _id?: string }>;
  reviews?: unknown[] | number;
  certification?: UserExpertService["certifications"];
  membership?: UserExpertService["memberships"];
  insurance?: UserExpertService["insurances"];
}

export type BusinessData = BusinessDto | BusinessDto[] | { businesses: BusinessDto[] } | null;
