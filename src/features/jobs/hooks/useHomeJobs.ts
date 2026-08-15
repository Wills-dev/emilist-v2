import { useMemo } from "react";

import { useStore } from "@/store/authStore";
import { mapJobListItem } from "../helpers/jobList";
import { useGetAllJobs } from "./useGetAllJobs";

export const useHomeJobs = (limit = 4) => {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const normalizedLimit =
    Number.isFinite(limit) && limit > 0 ? Math.trunc(limit) : 4;
  const requestQuery = useMemo(
    () => ({
      limit: normalizedLimit,
      ...(currentUserId ? { userId: currentUserId } : {}),
    }),
    [currentUserId, normalizedLimit],
  );
  const query = useGetAllJobs({ query: requestQuery });
  const jobs = useMemo(
    () =>
      (query.data?.pages.flatMap((page) => page.jobs.map(mapJobListItem)) ?? [])
        .filter((job, index, allJobs) =>
          Boolean(job.id) &&
          allJobs.findIndex((candidate) => candidate.id === job.id) === index,
        )
        .slice(0, normalizedLimit),
    [normalizedLimit, query.data],
  );

  return { jobs, query };
};
