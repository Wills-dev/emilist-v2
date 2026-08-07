export type SupportFaqCategory = "general" | "jobs" | "payments" | "others";

export interface SupportFaq {
  id: number;
  question: string;
  answer: string;
}

export const supportFaqCategories: {
  value: SupportFaqCategory;
  label: string;
}[] = [
  { value: "general", label: "General" },
  { value: "jobs", label: "Jobs" },
  { value: "payments", label: "Payments" },
  { value: "others", label: "Others" },
];

export const supportFaqs: Record<SupportFaqCategory, SupportFaq[]> = {
  general: [
    {
      id: 1,
      question: "How does Emilist work?",
      answer:
        "Request a service, select a convenient date and time, and choose a verified provider. Payment is released after the completed job is confirmed.",
    },
    {
      id: 2,
      question: "Do you support recurring services?",
      answer:
        "Yes. You can arrange recurring services for your home, estate, or business.",
    },
    {
      id: 3,
      question: "Are service providers verified?",
      answer:
        "Providers can submit their identity and professional credentials for verification before offering services.",
    },
    {
      id: 4,
      question: "Can businesses request custom service plans?",
      answer:
        "Yes. Contact our support team to discuss a service plan suited to your business.",
    },
    {
      id: 5,
      question: "Is my payment secure?",
      answer:
        "Payments are processed securely and held until the agreed service is completed.",
    },
    {
      id: 6,
      question: "What if something goes wrong?",
      answer:
        "Contact our support team with your job details and we will help resolve the issue.",
    },
    {
      id: 7,
      question: "Can I schedule a service for later?",
      answer:
        "Yes. Choose your preferred future date and time when creating the service request.",
    },
  ],
  jobs: [
    {
      id: 8,
      question: "How do I post a job?",
      answer:
        "Open Jobs, describe the service you need, add your schedule and budget, then publish the request.",
    },
    {
      id: 9,
      question: "Can I edit a job after posting it?",
      answer:
        "You can update an open job from its details page before accepting an offer.",
    },
    {
      id: 10,
      question: "How do I choose an expert?",
      answer:
        "Compare relevant experience, verification status, ratings, availability, and the submitted offer.",
    },
  ],
  payments: [
    {
      id: 11,
      question: "When is an expert paid?",
      answer:
        "Payment is released after the customer confirms that the service has been completed.",
    },
    {
      id: 12,
      question: "Where can I see my transactions?",
      answer:
        "Open Payments in your dashboard to view your payment and transaction history.",
    },
    {
      id: 13,
      question: "What happens if a payment fails?",
      answer:
        "Check your payment details and retry. If the issue continues, contact our support team.",
    },
  ],
  others: [
    {
      id: 14,
      question: "How do I update my profile?",
      answer:
        "Open your dashboard settings to update your personal and professional information.",
    },
    {
      id: 15,
      question: "How do I report an account?",
      answer:
        "Send the account details and reason for reporting it to our support email for review.",
    },
    {
      id: 16,
      question: "How can I contact Emilist?",
      answer:
        "Use the email, helpline, or Instagram contact options shown on this support page.",
    },
  ],
};
