import { toast } from "sonner";
import { trackReportEvent } from "../api/recordReportEvent";
export const useProfileShare = (href: string, name: string, userId: string) => {
  const share = async () => {
    const url = new URL(href, window.location.origin).href;
    try {
      if (navigator.share) await navigator.share({ title: name, url });
      else { await navigator.clipboard.writeText(url); toast.success("Profile link copied"); }
      trackReportEvent("share", { resourceType: "profile", subjectUserId: userId });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) toast.error("Could not share this profile.");
    }
  };
  return share;
};
