import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import Container from "@/components/atoms/Container/Container";
import TicketDetail from "@/features/support/components/TicketDetail/TicketDetail";

export const metadata = createPageMetadata({"title": "Support Ticket", "description": "Support Ticket on Emilist.", "index": false});


export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DashboardLayout><Container variant="small" className="py-4"><TicketDetail requestId={id} /></Container></DashboardLayout>;
}
