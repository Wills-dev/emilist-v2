import { Review } from "@/lib/types/review";
import { CompareJobItem, DashboardJobFixture } from "../types";

export const dashboardJobs: DashboardJobFixture[] = [
  { id: "1", category: "Carpentry", title: "Home Furniture Upgrade", description: "Remake old chairs, cabinets, beds & doors", price: 4500000, location: "Gbagada Phase 1", projectDuration: "3 weeks", applicants: 13, fullName: "Arthur Phillips", rating: 4, reviews: 51, isLiked: true, level: "Intermediate", noticePeriod: "immediately", state: "Lagos" },
  { id: "2", category: "Carpentry", title: "6-Bedroom Duplex Roofing", description: "Complete the roofing of a family home", price: 15000000, location: "Agric, Ikorodu", projectDuration: "1 week", applicants: 0, fullName: "Olawale Shina", rating: 4, reviews: 51, isLiked: true, level: "Senior", noticePeriod: "7_days", state: "Lagos" },
  { id: "3", category: "Plumbing", title: "Plumbing System Rebuild", description: "Complete bathroom pipe repairs", price: 2800000, location: "Omole Phase 2", projectDuration: "3 weeks", applicants: 3, fullName: "Omadebo Felix", rating: 4, reviews: 51, isLiked: true, level: "Junior", noticePeriod: "3_days", state: "Lagos" },
  { id: "4", category: "Janitorial Services", title: "Hotel Cleaning Crew", description: "Maintain the hotel's cleaning regularly", price: 650000, location: "Ago Palace Way", projectDuration: "Every week", applicants: 30, fullName: "Executive Palace Hotel", rating: 4, reviews: 51, isLiked: true, level: "Apprentice", noticePeriod: "immediately", state: "Lagos" },
  { id: "5", category: "Electrical", title: "Residential Wiring Upgrade", description: "Replace old wiring and distribution boards", price: 920000, location: "Yaba, Lagos", projectDuration: "2 weeks", applicants: 7, fullName: "Kennedy James", rating: 5, reviews: 32, isLiked: false, level: "Senior", noticePeriod: "14_days", state: "Lagos" },
  { id: "6", category: "Painting", title: "Exterior House Painting", description: "Prepare and repaint a duplex exterior", price: 780000, location: "Lekki Phase 1", projectDuration: "10 days", applicants: 5, fullName: "Amina Yusuf", rating: 4, reviews: 28, isLiked: false, level: "Intermediate", noticePeriod: "3_days", state: "Lagos" },
  { id: "7", category: "Tiling", title: "Kitchen Floor Retiling", description: "Remove and replace damaged floor tiles", price: 510000, location: "Surulere", projectDuration: "5 days", applicants: 9, fullName: "Tony Ade", rating: 4, reviews: 19, isLiked: false, level: "Junior", noticePeriod: "7_days", state: "Lagos" },
  { id: "8", category: "Gardening", title: "Landscape Maintenance", description: "Monthly garden and lawn maintenance", price: 350000, location: "Ikeja GRA", projectDuration: "1 month", applicants: 12, fullName: "Green Homes", rating: 5, reviews: 44, isLiked: false, level: "Intermediate", noticePeriod: "30_days", state: "Lagos" },
];

export const dashboardJobReviews: Review[] = [
  { _id: "review-1", rating: 5, comment: "Arthur communicated clearly, provided everything needed for the work, and approved each milestone promptly. I would gladly work with him again.", createdAt: "2026-08-02T16:00:00.000Z", user: { _id: "olamide", firstName: "Olamide", lastName: "Komolafe" } },
  { _id: "review-2", rating: 5, comment: "The job description was accurate and the working arrangement was professional from start to finish.", createdAt: "2026-08-02T15:00:00.000Z", user: { _id: "johnson", firstName: "Johnson", lastName: "B’oer" } },
  { _id: "review-3", rating: 5, comment: "A well-organised employer with realistic expectations and timely feedback throughout the project.", createdAt: "2026-08-02T14:00:00.000Z", user: { _id: "tyrique", firstName: "Tyrique", lastName: "Ifeanyi" } },
  { _id: "review-4", rating: 4, comment: "Good experience overall. The milestones and payment schedule were explained before the work started.", createdAt: "2026-08-02T13:00:00.000Z", user: { _id: "mensah", firstName: "Mensah", lastName: "Koffi" } },
  { _id: "review-5", rating: 4, comment: "Responsive, respectful, and easy to collaborate with during the furniture upgrade.", createdAt: "2026-08-02T12:00:00.000Z", user: { _id: "adam", firstName: "Adam", lastName: "Georgie" } },
];

export const dashboardJobReviewSummary = {
  totalReviews: 51,
  totalComments: 100,
  ratingDistribution: { 1: 0, 2: 3, 3: 8, 4: 25, 5: 15 },
  owner: {
    id: "arthur-phillips",
    name: "Arthur Phillips",
    rating: 4,
    jobsPosted: 5,
  },
};

export const jobInfoFixture = {
  category: "Carpentry",
  title: "Home Furniture Upgrade",
  createdAt: "2026-05-19T14:32:10.123Z",
  price: 400000,
  currency: "NGN",
  location: "Gbagada Phase 1, Lagos",
  duration: "3 weeks",
  applicants: 10,
  level: "Intermediate",
  milestoneCount: 3,
  ownerId: "arthur-phillips",
  ownerName: "Executive Palace Hotel",
  ownerRating: 4,
  ownerReviewCount: 51,
  urgency: "Immediately",
  description: [
    "Remake old chairs, cabinets, beds & doors for a residential family building in Gbagada Phase 1 on the Lagos Mainland axis.",
    "We appreciate experienced furniture makers who are committed to crafting long lasting furniture pieces and pride themselves on meeting deadlines efficiently. Apply if you’re a fit for this role.",
    "We’re looking forward to working with you.",
  ],
};

const comparisonDefaults = {
  currency: "NGN",
  ownerId: "arthur-phillips",
  ownerName: "Arthur Phillips",
  rating: 4,
  reviewCount: 51,
  credentials: ["Painters Association of Nigeria Certified", "Painters Association of Nigeria Member", "Painters Association of Nigeria President"],
  languages: "English, French",
  employerRating: 4.7,
  employerReviews: 140,
  jobsPosted: 45,
};

export const comparedJobs: CompareJobItem[] = [
  { ...comparisonDefaults, id: "1", title: "Home Furniture Upgrade", description: "Remake old chairs, cabinets, beds & doors", price: 4500000, category: "Carpenter", location: "Gbagada, Lagos", experience: "Senior (5 yrs+)", noticePeriod: "4 days" },
  { ...comparisonDefaults, id: "2", title: "6-Bedroom Duplex Roofing", description: "Complete the roofing of a family home", price: 15000000, category: "Carpenter", location: "Agric, Ikorodu", experience: "Mid-Level (3–5 yrs)", noticePeriod: "1 week", languages: "English, Hausa", employerRating: 4.5, employerReviews: 85, jobsPosted: 30 },
  { ...comparisonDefaults, id: "3", title: "Plumbing System Rebuild", description: "Complete bathroom pipe repairs", price: 2800000, category: "Plumber", location: "Omole Phase 2", experience: "Senior (5 yrs+)", noticePeriod: "4 days" },
  { ...comparisonDefaults, id: "4", title: "Hotel Cleaning Crew", description: "Maintain the hotel's cleaning regularly", price: 650000, category: "Cleaner", location: "Ago Palace Way", experience: "Entry-Level (0–2 yrs)", noticePeriod: "Immediate", languages: "English", employerRating: 4.2, employerReviews: 50, jobsPosted: 15 },
];
