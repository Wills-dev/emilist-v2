export type UpdateApplicationStatus = "applied" | "accepted" | "rejected" | "pause" | "unpause";

export interface UpdateApplicationStatusParams {
  /** The application ID, despite the backend path parameter name. */
  projectId: string;
  status: UpdateApplicationStatus;
}
