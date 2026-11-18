import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { ticketTone } from "../../helpers/supportOptions";
export default function TicketStatusBadge({ status }: { status: string }) {
  return <StatusBadge label={status} tone={ticketTone(status)} className="self-start py-0.5! leading-4" />;
}
