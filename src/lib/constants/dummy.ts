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
