import type { LeadJobRow } from "../types/manageJobs";

export const dummyLeadJobs: LeadJobRow[] = [
  {
    id: "1",
    posted: "2 days ago",
    serviceCategory: "Carpentry",
    jobId: "#123...",
    jobTitle: "Home Furniture Upgrade",
    budget: "₦450,000",
    location: "Yaba, Lagos",
    applicants: 12,
  },
  {
    id: "2",
    posted: "3 days ago",
    serviceCategory: "Carpentry",
    jobId: "#123...",
    jobTitle: "6-Bedroom Duplex Roofing",
    budget: "₦1,450,000",
    location: "Bariga, Lagos",
    applicants: 11,
  },
  {
    id: "3",
    posted: "1 day ago",
    serviceCategory: "Plumbing",
    jobId: "#123...",
    jobTitle: "Plumbing System Rebuild",
    budget: "₦850,000",
    location: "Ogba, Ikeja",
    applicants: 4,
  },
  {
    id: "4",
    posted: "5 days ago",
    serviceCategory: "Janitorial",
    jobId: "#123...",
    jobTitle: "Hotel Cleaning Crew",
    budget: "₦5,300,000",
    location: "Mushin, Lagos",
    applicants: 2,
  },
];
