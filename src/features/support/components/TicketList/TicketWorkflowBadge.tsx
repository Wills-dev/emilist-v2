import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { supportLabel } from "../../helpers/supportOptions";
import { workflowStyles } from "../../helpers/ticketStyles";
export default function TicketWorkflowBadge({ status }: { status: string }) {
  return <StatusBadge label={status === "resolved" || status === "closed" ? "Closed" : supportLabel(status)} className={`self-start py-0.5! leading-4 ${workflowStyles[status] || ""}`} />;
}
