import {
  JobDurationUnit,
  JobExperienceLevel,
  JobFrequency,
  JobUrgency,
  PostJobOption,
} from "../types/postJob";

export const MAX_POST_JOB_MILESTONES = 5;
export const MAX_POST_JOB_FILES = 10;
export const DEFAULT_POST_JOB_CURRENCY = "NGN";

export const POST_JOB_CATEGORY_SERVICE_OPTIONS = {
  Construction: [
    "Bricklayer",
    "Carpenter",
    "Electrician",
    "Painter",
    "Plumber",
    "Roofer",
    "Tiler",
  ],
  Plumbing: ["Installation", "Maintenance", "Repair"],
  Cleaning: [
    "Commercial cleaner",
    "Deep clean",
    "Domestic cleaner",
    "Janitorial service",
    "Post-construction cleaner",
  ],
  Gardening: ["Garden maintenance", "Landscaping", "Lawn mowing"],
  Electrical: ["Installation", "Repair", "Wiring and rewiring"],
  Painting: ["Exterior painting", "Interior painting", "Surface finishing"],
  Carpentry: ["Furniture making", "Installation", "Repair and restoration"],
} as const;

export type PostJobCategory = keyof typeof POST_JOB_CATEGORY_SERVICE_OPTIONS;

export const POST_JOB_CATEGORY_OPTIONS: PostJobOption[] = Object.keys(
  POST_JOB_CATEGORY_SERVICE_OPTIONS,
).map((category) => ({ label: category, value: category }));

export const POST_JOB_URGENCY_OPTIONS: PostJobOption<JobUrgency>[] = [
  { label: "Right now", value: "right_now" },
  { label: "In future", value: "in_future" },
  { label: "Regularly", value: "regularly" },
];

export const POST_JOB_EXPERIENCE_OPTIONS: PostJobOption<JobExperienceLevel>[] =
  [
    { label: "Apprentice", value: "apprentice" },
    { label: "Junior", value: "junior" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Senior", value: "senior" },
  ];

export const POST_JOB_FREQUENCY_OPTIONS: PostJobOption<JobFrequency>[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Every 2 weeks", value: "biweekly" },
  { label: "Monthly", value: "monthly" },
];

export const POST_JOB_DURATION_OPTIONS: PostJobOption<JobDurationUnit>[] = [
  { label: "Day(s)", value: "days" },
  { label: "Week(s)", value: "weeks" },
  { label: "Month(s)", value: "months" },
];
