import { UserExpertService } from "../types/expertService";

export const userExpertServices: UserExpertService[] = [
  {
    id: "6a1bf83ec64f917abf9b33ec", service: "Carpenter", services: ["Carpentry", "Furniture repairs"], coverageArea: ["Yaba", "Shomolu", "Bariga", "Ebute Metta", "Mushin"], businessName: "Adeolu Carpentry & Sons", yearFounded: "2018", numberOfEmployee: "10", businessAddress: "7 Olowu street", businessState: "Lagos", businessCountry: "Nigeria", startingPrice: "15000", currency: "NGN", rateUnit: "per day", noticePeriod: "3 days", businessDescription: "We build and restore durable furniture for homes and businesses.", image: "/assets/images/profile-view3.svg", businessImages: ["/assets/images/default-job-image.svg", "/assets/images/material.svg"], rating: 4, reviews: 51, level: "Senior (5+ years experience)", isVerified: true,
    certifications: [{ id: "673358be2301d2b6c219435d", issuingOrganisation: "Certify Co. 10", verificationNumber: "67856", issuingDate: "2022-05-15", expiringDate: "2024-05-15", isCertificateExpire: true }],
    memberships: [{ id: "6a1bf83fc64f917abf9b33f2", organisation: "DAC", positionHeld: "Dr", startDate: "2022-05-15", endDate: "2027-05-15", isMembershipExpire: false }],
    insurances: [{ id: "673336825d86ffb9f709821c", issuingOrganisation: "Insurance Corporation", coverage: "Property Insurance", description: "Covers accidental damage while rendering services." }],
  },
  {
    id: "6a1bf83ec64f917abf9b33ed", service: "Welder", services: ["Welding"], coverageArea: ["Ikeja", "Agege"], businessName: "Adeolu Metal Works", yearFounded: "2020", numberOfEmployee: "4", businessAddress: "12 Allen Avenue", businessState: "Lagos", businessCountry: "Nigeria", startingPrice: "22000", currency: "NGN", rateUnit: "per day", noticePeriod: "2 days", businessDescription: "Structural and decorative metal fabrication services.", image: "/assets/images/avatar.svg", businessImages: ["/assets/images/default-job-image.svg"], rating: 4.5, reviews: 23, level: "Intermediate", isVerified: true, certifications: [], memberships: [], insurances: [],
  },
];
