export interface Milestone {
  id: string;
  title: string;
  duration: string;
  amount: number;
  currency?: string;
  details: string;
  isExpanded: boolean;
}

export interface DashboardJobFixture {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  location: string;
  projectDuration: string;
  applicants: number;
  isLiked: boolean;
  fullName: string;
  rating: number;
  reviews: number;
  level: string;
  noticePeriod: string;
  state: string;
  profileImgUrl?: string;
  imageUrl?: string;
  date?: string;
}

export interface CompareJobItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  ownerId: string;
  ownerName: string;
  rating: number;
  reviewCount: number;
  credentials: string[];
  category: string;
  location: string;
  experience: string;
  noticePeriod: string;
  languages: string;
  employerRating: number;
  employerReviews: number;
  jobsPosted: number;
}

export type {
  FetchAllJobsEnvelope,
  FetchAllJobsItemDto,
  FetchAllJobsListQuery,
  FetchAllJobsPage,
  FetchAllJobsQuery,
  FetchAllJobsWireParams,
  JobCardViewModel,
  JobListDurationDto,
  JobListLocationDto,
  JobListMediaDto,
  JobListMoneyDto,
  JobListPosterDto,
  JobListScheduleDto,
} from "./listJobs";
export type {
  FetchJobByIdData,
  FetchJobByIdEnvelope,
  FetchJobByIdQuery,
  JobDetailsDto,
  JobDetailsViewModel,
  JobMilestoneDto,
} from "./jobDetails";
