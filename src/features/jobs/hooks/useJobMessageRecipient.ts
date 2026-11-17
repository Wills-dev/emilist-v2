import { useApplicationDetails } from "./useApplicationDetails";
import type { ManagedJob } from "../types/jobManagement";
import type { MessageRecipient } from "@/features/messages/types/recipient";

export const useJobMessageRecipient = (job: ManagedJob, isOwner: boolean) => {
  const accepted = job.applications?.find((item) => item._id === job.acceptedApplicationId || item.status === "accepted");
  const acceptedUserId = typeof accepted?.user === "string" ? accepted.user : accepted?.user?._id;
  const needsApplication = isOwner && !acceptedUserId && Boolean(job.acceptedApplicationId);
  const application = useApplicationDetails(job.acceptedApplicationId ?? "", job.id, { enabled: needsApplication });
  const person = application.data?.user;
  const userId = isOwner ? acceptedUserId || person?._id : job.ownerId;
  const recipient: MessageRecipient | undefined = userId ? {
    userId,
    name: isOwner ? person?.fullName || [person?.firstName, person?.lastName].filter(Boolean).join(" ") || person?.userName || job.expert?.name || "Artisan" : job.ownerName,
    image: isOwner ? job.expert?.image : job.ownerImage,
  } : undefined;
  return { recipient, loading: needsApplication && application.isPending };
};
