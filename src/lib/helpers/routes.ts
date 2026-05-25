export const routes = {
  home: "/",
  joinExpert: "/become-expert",
  postJob: "/post-job",
  marketplace: {
    jobs: "/marketplace/jobs",
    jobInfo: (jobId: string) => `/marketplace/jobs/${jobId}`,
    experts: "/marketplace/experts",
    expertInfo: (expertId: string) => `/marketplace/experts/${expertId}`,
    materials: "/marketplace/materials",
    materialInfo: (materialId: string) =>
      `/marketplace/materials/${materialId}`,
  },
  profile: (userId: string) => `/profile/${userId}`,
  login: "/auth/login",
  signUp: "/auth/register",
  dashboard: "/dashboard/overview",
  bookService: "/book-service",
  bookMaintenance: "/book-maintenance",
  bookMeeting: "/book-meeting",
};
