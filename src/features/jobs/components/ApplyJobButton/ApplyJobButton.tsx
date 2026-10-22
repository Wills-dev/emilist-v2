"use client";

import { normalizeJobStatus } from "../../helpers/manageJobs";
import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { useStore } from "@/store/authStore";
import { useGetJobById } from "../../hooks/useGetJobById";
import type { JobDetailsViewModel } from "../../types";
import JobApplicationModal from "../JobApplicationModal/JobApplicationModal";

const ApplicationLoader = ({ jobId, onClose }: { jobId: string; onClose: () => void }) => {
  const query = useGetJobById(jobId);
  if (query.data) return <JobApplicationModal job={query.data} onClose={onClose} />;
  return <ModalWrapper open onClose={(open) => { if (!open) onClose(); }} title="Job Application">
    {query.isError ? <div role="alert">Unable to load this job. <button type="button" onClick={() => void query.refetch()}>Try again</button></div> : <p role="status">Loading job…</p>}
  </ModalWrapper>;
};

const ApplyJobButton = ({ jobId, ownerId, job, status, label = "Apply Now", variant = "secondary", className }: {
  jobId: string; status?: string; ownerId?: string; job?: JobDetailsViewModel; label?: string;
  variant?: "primary" | "secondary"; className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const currentUser = useStore((state) => state.currentUser);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);
  const openModal = useStore((state) => state.openModal);
  if (normalizeJobStatus(status ?? job?.status ?? "") === "applied") return null;
  if (currentUser?._id && currentUser._id === (ownerId ?? job?.ownerId)) return null;
  const apply = () => {
    if (!currentUser) {
      setIsModalFlow(true);
      openModal("login");
      return;
    }
    setOpen(true);
  };
  return <>
    <Button type="button" variant={variant} className={className} onClick={apply}>{label}</Button>
    {open && currentUser && (job ? <JobApplicationModal job={job} onClose={() => setOpen(false)} /> : <ApplicationLoader jobId={jobId} onClose={() => setOpen(false)} />)}
  </>;
};

export default ApplyJobButton;
