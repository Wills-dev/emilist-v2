import { CompareExpertItem, DashboardExpertFixture } from "../types";
import { Review } from "@/lib/types/review";

export const dashboardExperts: DashboardExpertFixture[] = [
  { id: "expert-1", imgUrl: "/assets/dummyImages/pipe.svg", businessName: "Olawale Pipes & Fittings", isVerified: true, rating: 5, noOfReviews: 51, price: 50000, period: "day", currency: "NGN", location: "Ikorodu, Lagos", state: "Lagos", noOfCompletedJobs: 28, serviceType: "Plumber", level: "Senior", isLiked: false },
  { id: "expert-2", imgUrl: "/assets/images/default-job-image.svg", businessName: "Arthur Furniture Works", isVerified: true, rating: 4, noOfReviews: 38, price: 75000, period: "day", currency: "NGN", location: "Gbagada, Lagos", state: "Lagos", noOfCompletedJobs: 41, serviceType: "Carpenter", level: "Senior", isLiked: true },
  { id: "expert-3", imgUrl: "/assets/images/default-job-image.svg", businessName: "Amina Interior Studio", isVerified: true, rating: 5, noOfReviews: 44, price: 120000, period: "project", currency: "NGN", location: "Lekki, Lagos", state: "Lagos", noOfCompletedJobs: 35, serviceType: "Interior Designer", level: "Intermediate", isLiked: false },
  { id: "expert-4", imgUrl: "/assets/images/default-job-image.svg", businessName: "Felix Electrical Services", isVerified: false, rating: 4, noOfReviews: 26, price: 60000, period: "day", currency: "NGN", location: "Ikeja, Lagos", state: "Lagos", noOfCompletedJobs: 19, serviceType: "Electrician", level: "Intermediate", isLiked: false },
  { id: "expert-5", imgUrl: "/assets/images/default-job-image.svg", businessName: "Green Homes Landscaping", isVerified: true, rating: 4, noOfReviews: 31, price: 85000, period: "day", currency: "NGN", location: "Yaba, Lagos", state: "Lagos", noOfCompletedJobs: 23, serviceType: "Landscaper", level: "Junior", isLiked: true },
  { id: "expert-6", imgUrl: "/assets/images/default-job-image.svg", businessName: "Executive Cleaning Crew", isVerified: true, rating: 5, noOfReviews: 63, price: 45000, period: "day", currency: "NGN", location: "Surulere, Lagos", state: "Lagos", noOfCompletedJobs: 52, serviceType: "Commercial Cleaner", level: "Senior", isLiked: false },
];

export const dashboardExpertProfile = {
  about: [
    "We provide reliable plumbing installation, maintenance, and emergency repair services for homes and commercial properties.",
    "Our verified team combines practical experience with clear communication, accurate estimates, and dependable project delivery.",
  ],
  languages: "English, Yoruba",
  availability: "Available immediately",
  noticePeriod: "3 days",
  galleryImages: [
    "/assets/dummyImages/pipe.svg",
    "/assets/images/default-job-image.svg",
    "/assets/images/jobs.svg",
  ],
  services: [
    { id: "service-1", title: "Pipe installation and repairs", price: 50000, duration: "1 day" },
    { id: "service-2", title: "Bathroom plumbing upgrade", price: 150000, duration: "3 days" },
    { id: "service-3", title: "Emergency plumbing call-out", price: 35000, duration: "Same day" },
  ],
  credentials: [
    "Association of Professional Plumbers of Nigeria",
    "Certified Water Systems Installer",
    "Public liability insurance verified",
  ],
};

export const dashboardExpertReviewSummary = {
  totalReviews: 51,
  totalComments: 100,
  averageRating: 4,
  ratingDistribution: { 1: 0, 2: 3, 3: 8, 4: 25, 5: 15 },
};

export const dashboardExpertReviews: Review[] = [
  { _id: "expert-review-1", rating: 5, comment: "A dependable expert who communicated clearly and completed the plumbing repairs to a very high standard.", createdAt: "2026-08-02T16:00:00.000Z", user: { _id: "olamide", firstName: "Olamide", lastName: "Komolafe" } },
  { _id: "expert-review-2", rating: 5, comment: "Professional, punctual, and careful with the property. The final result was exactly what we agreed.", createdAt: "2026-08-02T15:00:00.000Z", user: { _id: "johnson", firstName: "Johnson", lastName: "B’oer" } },
  { _id: "expert-review-3", rating: 4, comment: "Good workmanship and useful advice about maintaining the new installation after completion.", createdAt: "2026-08-02T14:00:00.000Z", user: { _id: "tyrique", firstName: "Tyrique", lastName: "Ifeanyi" } },
  { _id: "expert-review-4", rating: 4, comment: "The project was handled carefully, with useful updates throughout each stage of the work.", createdAt: "2026-08-02T13:00:00.000Z", user: { _id: "mensah", firstName: "Mensah", lastName: "Koffi" } },
  { _id: "expert-review-5", rating: 5, comment: "Excellent service and a very tidy finish. I would confidently recommend this expert to other homeowners.", createdAt: "2026-08-02T12:00:00.000Z", user: { _id: "adam", firstName: "Adam", lastName: "Georgie" } },
];

const comparisonDefaults = {
  currency: "NGN",
  period: "day",
  rating: 4,
  reviewCount: 51,
  credentials: [
    "Painters Association of Nigeria Certified",
    "Painters Association of Nigeria Member",
    "Painters Association of Nigeria President",
  ],
  about:
    "A reliable, verified professional committed to careful workmanship, clear communication, and dependable project delivery.",
  serviceCategory: "Painter",
  languages: "English, French",
  insurance: "Property Insurance",
};

export const comparedExperts: CompareExpertItem[] = [
  { ...comparisonDefaults, id: "expert-1", name: "Mike Adeyemi", price: 15000, experience: "Senior (5 yrs+)", jobsCompleted: 45, noticePeriod: "4 days", location: "Lagos, Nigeria" },
  { ...comparisonDefaults, id: "expert-2", name: "Shola Ahmed", price: 10000, experience: "Mid-Level (3–5 yrs)", jobsCompleted: 30, noticePeriod: "1 week", location: "Abuja, Nigeria", languages: "English, Hausa", insurance: "Liability Insurance", rating: 4.5, reviewCount: 85 },
  { ...comparisonDefaults, id: "expert-3", name: "Bisi Onwunmi", price: 15000, experience: "Senior (5 yrs+)", jobsCompleted: 45, noticePeriod: "4 days", location: "Lagos, Nigeria", rating: 4.7, reviewCount: 140 },
  { ...comparisonDefaults, id: "expert-4", name: "Akpan Samuel", price: 55000, experience: "Entry-Level (0–2 yrs)", jobsCompleted: 15, noticePeriod: "Immediate", location: "Port Harcourt, Nigeria", languages: "English", insurance: "Workers’ Compensation", rating: 4.2, reviewCount: 50 },
];
