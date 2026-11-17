"use client";

import MessageButton from "@/features/messages/components/MessageButton/MessageButton";
import { useJobMessageRecipient } from "../../hooks/useJobMessageRecipient";
import type { ManagedJob } from "../../types/jobManagement";

const JobMessageButton = ({ job, isOwner, className }: { job: ManagedJob; isOwner: boolean; className?: string }) => {
  const { recipient, loading } = useJobMessageRecipient(job, isOwner);
  return <MessageButton recipient={recipient} disabled={loading} className={className} />;
};

export default JobMessageButton;
