import { create } from "zustand";

import type { ExistingJobFile } from "@/features/jobs/components/ExistingJobFiles/ExistingJobFiles";

interface EditJobMetaState {
  hydratedJobId: string | null;
  existingFiles: ExistingJobFile[];
  setHydrated: (jobId: string, existingFiles: ExistingJobFile[]) => void;
  removeExistingFile: (fileId: string) => void;
  reset: () => void;
}

// Tracks per-page state that shouldn't live in the shared draft store: which
// job the draft store has been hydrated for (so a background refetch doesn't
// clobber in-progress edits), and the server-hosted files fetched with it.
export const useEditJobMetaStore = create<EditJobMetaState>((set) => ({
  hydratedJobId: null,
  existingFiles: [],
  setHydrated: (jobId, existingFiles) =>
    set({ hydratedJobId: jobId, existingFiles }),
  removeExistingFile: (fileId) =>
    set((state) => ({
      existingFiles: state.existingFiles.filter((file) => file.id !== fileId),
    })),
  reset: () => set({ hydratedJobId: null, existingFiles: [] }),
}));
