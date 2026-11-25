import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import Container from "@/components/atoms/Container/Container";
import TicketForm from "@/features/support/components/TicketForm/TicketForm";

export const metadata = createPageMetadata({"title": "New Support Ticket", "description": "New Support Ticket on Emilist.", "index": false});


export default function NewTicketPage() {
  return <DashboardLayout><Container variant="small" className="py-4"><TicketForm /></Container></DashboardLayout>;
}
