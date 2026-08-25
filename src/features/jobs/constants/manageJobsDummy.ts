import type {
  ActiveJobRow,
  LeadJobRow,
  OverdueJobRow,
  PausedJobRow,
} from "../types/manageJobs";

export const dummyOverdueJobs: OverdueJobRow[] = [
  {
    id: "1",
    startDate: "03/04/2026",
    jobId: "#123...",
    jobTitle: "Home Furniture Upgrade",
    duration: "7 days",
    budget: "₦450,000",
  },
  {
    id: "2",
    startDate: "02/04/2026",
    jobId: "#123...",
    jobTitle: "6-Bedroom Duplex Roofing",
    duration: "2 months",
    budget: "₦1,450,000",
  },
  {
    id: "3",
    startDate: "01/04/2026",
    jobId: "#123...",
    jobTitle: "Plumbing System Rebuild",
    duration: "2 days",
    budget: "₦850,000",
  },
  {
    id: "4",
    startDate: "24/03/2026",
    jobId: "#123...",
    jobTitle: "Hotel Cleaning Crew",
    duration: "6 months",
    budget: "₦5,300,000",
  },
];

export const dummyPausedJobs: PausedJobRow[] = [
  {
    id: "1",
    dateCreated: "03/04/2026",
    jobId: "#123...",
    jobTitle: "Home Furniture Upgrade",
    duration: "3 weeks",
    budget: "₦450,000",
  },
  {
    id: "2",
    dateCreated: "02/04/2026",
    jobId: "#123...",
    jobTitle: "6-Bedroom Duplex Roofing",
    duration: "2 months",
    budget: "₦1,450,000",
  },
  {
    id: "3",
    dateCreated: "01/04/2026",
    jobId: "#123...",
    jobTitle: "Plumbing System Rebuild",
    duration: "2 days",
    budget: "₦850,000",
  },
  {
    id: "4",
    dateCreated: "24/03/2026",
    jobId: "#123...",
    jobTitle: "Hotel Cleaning Crew",
    duration: "6 months",
    budget: "₦5,300,000",
  },
];

export const dummyActiveJobs: ActiveJobRow[] = [
  {
    id: "1",
    startDate: "03/04/2026",
    jobId: "#123...",
    jobTitle: "Home Furniture Upgrade",
    budget: "₦450,000",
    progress: "Milestone 2",
  },
  {
    id: "2",
    startDate: "02/04/2026",
    jobId: "#123...",
    jobTitle: "6-Bedroom Duplex Roofing",
    budget: "₦1,450,000",
    progress: "Milestone 1",
  },
  {
    id: "3",
    startDate: "01/04/2026",
    jobId: "#123...",
    jobTitle: "Plumbing System Rebuild",
    budget: "₦850,000",
    progress: "Milestone 3",
  },
  {
    id: "4",
    startDate: "24/03/2026",
    jobId: "#123...",
    jobTitle: "Hotel Cleaning Crew",
    budget: "₦5,300,000",
    progress: "Pending",
  },
];

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
