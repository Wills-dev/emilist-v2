export const priorityTextStyles: Record<string, string> = {
  critical: "text-[#FF005C]", urgent: "text-[#FF005C]", high: "text-[#FF005C]",
  medium: "text-[#F05216]", normal: "text-[#B76A00]", low: "text-[#172033]",
};
export const priorityBackgroundStyles: Record<string, string> = {
  critical: "bg-[#FFF0F5]", urgent: "bg-[#FFF0F5]", high: "bg-[#FFF0F5]",
  medium: "bg-[#FFF3EC]", normal: "bg-[#FFF8E7]", low: "bg-[#F1F3F6]",
};
export const workflowStyles: Record<string, string> = {
  open: "bg-[#E8F1FF]! text-[#2261B0]!",
  in_progress: "bg-[#EFECFF]! text-[#6551BD]!",
  pending_customer: "bg-[#FFF7DF]! text-[#A36500]!",
  pending_resolution: "bg-[#FFF0E5]! text-[#B75316]!",
  resolved: "bg-[#DCF7E9]! text-[#087F54]!",
  closed: "bg-[#DCF7E9]! text-[#087F54]!",
};
