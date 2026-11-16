/** Regular jobs and an explicit non-bidding flag must never expose offer actions. */
export const resolveJobApplicationType = (job: { type?: string; allowBidding?: boolean }) => {
  const type = job.type?.trim().toLowerCase();
  if (type === "regular" || job.allowBidding === false) return "regular";
  if (type === "biddable" || job.allowBidding === true) return "biddable";
  return undefined;
};
