import { Milestone } from "@/features/jobs/types";

export const comments = [
  {
    index: 0,
    comment:
      "I found a good plumber in Lekki to fix my damaged drainage system and paid him after he finished. The process was fast, easy and straightforward. Loved it",
    name: "Tunde Johnson",
    location: "Lagos",
  },

  {
    index: 1,
    comment:
      "I hired an electrician through Emilist for my office setup in Ikeja and the experience was smooth from start to finish. Communication was easy and the work was neatly done.",
    name: "Chioma Okafor",
    location: "Abuja",
  },

  {
    index: 2,
    comment:
      "I was able to get quality building materials at a good price without stress. Delivery was fast and the seller was very responsive throughout the process.",
    name: "Emeka Daniels",
    location: "Port Harcourt",
  },
];

export const initialMilestones: Milestone[] = [
  {
    id: "1",
    title: "Project Planning",
    duration: "1 week",
    amount: 50000,
    details:
      "Requirements gathering, wireframes, project architecture and technical documentation.",
    isExpanded: true,
  },
  {
    id: "2",
    title: "UI Development",
    duration: "2 weeks",
    amount: 120000,
    details: "Develop all user-facing screens and reusable UI components.",
    isExpanded: true,
  },
  {
    id: "3",
    title: "API Integration",
    duration: "1 week",
    amount: 70000,
    details: "Connect frontend to backend APIs and implement data handling.",
    isExpanded: true,
  },
  {
    id: "4",
    title: "Testing",
    duration: "5 days",
    amount: 40000,
    details: "Perform functional testing, bug fixes and cross-browser testing.",
    isExpanded: true,
  },
  {
    id: "5",
    title: "Deployment",
    duration: "3 days",
    amount: 20000,
    details:
      "Deploy application, configure production environment and monitoring.",
    isExpanded: true,
  },
];

export const reviewComments = [
  {
    id: "1",
    userId: "usr_001",
    fullName: "John Doe",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    comment:
      "Excellent service! The entire process was smooth and the team was very responsive. I'll definitely use this again.",
    date: "2026-07-12T09:18:43.512Z",
  },
  {
    id: "2",
    userId: "usr_002",
    fullName: "Amaka Okafor",
    profilePicture: null,
    rating: 4,
    comment:
      "Very professional and delivered exactly what I needed. There were a few minor delays, but overall it was a great experience.",
    date: "2026-07-10T14:27:11.901Z",
  },
  {
    id: "3",
    userId: "usr_003",
    fullName: "Michael Johnson",
    profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    comment:
      "Highly recommend! Great communication, quality work, and everything was completed ahead of schedule.",
    date: "2026-07-08T18:42:55.327Z",
  },
  {
    id: "4",
    userId: "usr_004",
    fullName: "Grace Williams",
    profilePicture: null,
    rating: 3,
    comment:
      "The service was okay. It met my expectations, but I think there's room for improvement in response time.",
    date: "2026-07-05T11:06:29.145Z",
  },
  {
    id: "5",
    userId: "usr_005",
    fullName: "Sophia Brown",
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    comment:
      "Really happy with the experience. The interface was easy to use, and the support team was helpful whenever I had questions.",
    date: "2026-07-02T16:51:08.784Z",
  },
];
