import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import Container from "@/components/atoms/Container/Container";
import TicketForm from "@/features/support/components/TicketForm/TicketForm";
export default function NewTicketPage() {
  return <DashboardLayout><Container variant="small" className="py-4"><TicketForm /></Container></DashboardLayout>;
}
