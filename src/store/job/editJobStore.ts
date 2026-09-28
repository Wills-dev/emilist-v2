import { create } from "zustand";

import { PostJobStoreState } from "@/store/types/job";
import { createJobDraftStoreBody } from "./createJobDraftStoreBody";

// Deliberately not persisted: each visit to the edit-job page should start
// from the job's current server state, not a stale draft from a previous edit.
export const useEditJobStore = create<PostJobStoreState>()(
  createJobDraftStoreBody,
);
