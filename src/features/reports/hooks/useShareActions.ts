import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { openShare } from "@/lib/helpers/shareInfo";
import { routes } from "@/lib/helpers/routes";
import { trackReportEvent } from "../api/recordReportEvent";
import type { ReportSubject } from "../helpers/reportEvents";
export type ShareResourceType = "user" | "expert" | "job" | "material";
export const useShareActions = (id: string, type: ShareResourceType, name: string) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const subject: ReportSubject = type === "user" ? { resourceType: "profile", subjectUserId: id } : { resourceType: type === "expert" ? "business" : type, resourceId: id };
  const path = type === "job" ? routes.marketplace.jobInfo(id) : type === "material" ? routes.marketplace.materialInfo(id) : type === "expert" ? routes.profiles.artisan(id) : routes.profile(id);
  const link = `${process.env.NEXT_PUBLIC_WEB_URL?.replace(/\/$/, "") ?? ""}${path}`;
  const title = type === "job" ? "Job Opportunity on Emilist" : type === "material" ? "Checkout Product on Emilist" : type === "expert" ? "Expert Profile on Emilist" : "Profile on Emilist";
  const text = {
    job: `Check out this job: "${name}" on Emilist. Explore and apply now before it's closed.`,
    material: `I found this material "${name}" on Emilist. You might find it useful too.`,
    expert: `Discover ${name} on Emilist. Connect and explore their services and experience.`,
    user: `Check out ${name}'s profile on Emilist. You might want to connect or collaborate.`,
  }[type];
  const absoluteLink = () => new URL(link, window.location.origin).href;
  const copiedFeedback = () => { setCopied(true); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 2000); };
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(absoluteLink()); copiedFeedback(); trackReportEvent("share", subject); }
    catch { toast.error("Could not copy this link."); }
  };
  const nativeShare = async () => {
    if (!navigator.share) { await copyLink(); return; }
    try { await navigator.share({ title, text, url: absoluteLink() }); trackReportEvent("share", subject); }
    catch (error) { if (!(error instanceof DOMException && error.name === "AbortError")) toast.error("Could not share this link."); }
  };
  const social = (platform: "whatsapp" | "X" | "facebook") => { openShare(platform, absoluteLink(), text); trackReportEvent("share", subject); };
  const whatsapp = () => social("whatsapp");
  const shareX = () => social("X");
  const facebook = () => social("facebook");
  return { title, link, copied, copyLink, nativeShare, whatsapp, shareX, facebook };
};
