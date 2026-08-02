export const routes = {
  home: "/",
  joinExpert: "/become-expert",
  congrats: "/become-expert/congratulations",
  postJob: "/post-job",
  postMaterial: "/post-material",
  cart: "/cart",
  checkout: "/checkout",
  postMaterialCongrats: "/post-material/congratulations",
  marketplace: {
    jobs: "/marketplace/jobs",
    jobInfo: (jobId: string) => `/marketplace/jobs/${jobId}`,
    experts: "/marketplace/experts",
    expertInfo: (expertId: string) => `/marketplace/experts/${expertId}`,
    materials: "/marketplace/materials",
    savedMaterials: "/marketplace/materials/saved",
    materialInfo: (materialId: string) =>
      `/marketplace/materials/${materialId}`,
    materialInfoReviews: (materialId: string) =>
      `/marketplace/materials/${materialId}/reviews`,
    similarMaterials: (materialId: string) =>
      `/marketplace/materials/similar/${materialId}`,
    sellerMaterials: (sellerId: string, sellerName?: string) =>
      `/marketplace/materials/seller/${sellerId}${
        sellerName ? `?sellerName=${encodeURIComponent(sellerName)}` : ""
      }`,
  },
  profile: (userId: string) => `/profile/${userId}`,
  login: "/auth/login",
  signUp: "/auth/register",
  verifyEmail: "/auth/verify-email",

  dashboard: "/dashboard/overview",
  dashboardLinks: {
    marketplace: "/dashboard/marketplace/jobs",
    payments: "/dashboard/payments",
    jobs: "/dashboard/jobs",
    marketplaceJobs: "/dashboard/marketplace/jobs",
    marketplaceJobInfo: (jobId: string) =>
      `/dashboard/marketplace/jobs/${jobId}`,
    marketplaceJobReviews: (jobId: string) =>
      `/dashboard/marketplace/jobs/${jobId}/reviews`,
    savedJobs: "/dashboard/marketplace/jobs/saved",
    compareJobs: "/dashboard/marketplace/jobs/compare",
    experts: "/dashboard/marketplace/experts",
    savedExperts: "/dashboard/marketplace/experts/saved",
    marketplaceExpertInfo: (expertId: string) =>
      `/dashboard/marketplace/experts/${expertId}`,
    marketplaceExpertReviews: (expertId: string) =>
      `/dashboard/marketplace/experts/${expertId}/reviews`,
    compareExperts: "/dashboard/marketplace/experts/compare",
    offerService: "/dashboard/offer-service",
    materials: "/dashboard/marketplace/materials",
    materialInfo: (materialId: string) =>
      `/dashboard/marketplace/materials/${materialId}`,
    materialInfoReviews: (materialId: string) =>
      `/dashboard/marketplace/materials/${materialId}/reviews`,
    similarMaterials: (materialId: string) =>
      `/dashboard/marketplace/materials/similar/${materialId}`,
    sellerMaterials: (sellerId: string, sellerName?: string) =>
      `/dashboard/marketplace/materials/seller/${sellerId}${
        sellerName ? `?sellerName=${encodeURIComponent(sellerName)}` : ""
      }`,
    savedMaterials: "/dashboard/marketplace/materials/saved",
    dashboardCart: "/dashboard/marketplace/cart",
    dashboardCheckout: "/dashboard/marketplace/checkout",
    orders: "/dashboard/marketplace/orders",
    listedMaterials: "/dashboard/marketplace/materials/listed",
    materialsCompare: "/dashboard/marketplace/materials/compare",
    reports: "/dashboard/reports",
    messages: "/dashboard/messages",
    support: "/dashboard/support",
  },
  enterprise: {
    bookService: "/enterprise/book-service",
    bookMaintenance: "/enterprise/book-maintenance",
    bookMeeting: "/enterprise/book-meeting",
    success: "/enterprise/success",
  },

  aboutUs: "/about-us",
  policy: "/policy",
  terms: "/terms",
  cookiePolicy: "/cookie-policy",
  how: "/how-it-works",
  faq: "/faq",
  guides: "/guides",
  helpCenter: "/help-center",
  blog: "/blog",
  news: "/news",
  tips: "/tips",
  testimonial: "/testimonial",
  completeProfile: "/dashboard/profile/complete",
};
