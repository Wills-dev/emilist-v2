import { supportLabel } from "../../helpers/supportOptions";
import { priorityTextStyles, priorityBackgroundStyles } from "../../helpers/ticketStyles";
export default function TicketPriority({ priority, badge = false }: { priority: string; badge?: boolean }) {
  const key = priority.toLowerCase();
  return <span className={`inline-flex items-center whitespace-nowrap font-medium ${priorityTextStyles[key] || "text-[#172033]"} ${badge ? `rounded-full px-2.5 py-0.5 leading-4 ${priorityBackgroundStyles[key] || "bg-[#F1F3F6]"}` : ""}`}>{supportLabel(priority)}</span>;
}
