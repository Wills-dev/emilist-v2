import Button from "@/components/atoms/Button/Button";
import Container from "@/components/atoms/Container/Container";
import { routes } from "@/lib/helpers/routes";
import TicketList from "../TicketList/TicketList";

export default function SupportWrapper() {
  return <Container variant="small" className="space-y-6 py-4">
    <TicketList />
    <nav aria-label="Support resources" className="flex flex-wrap gap-3 rounded-lg bg-white p-4">
      <Button href={routes.helpCenter} variant="secondary" className="h-11 w-full sm:w-auto">Help Center</Button>
      <Button href={routes.faq} variant="default" className="h-11 w-full sm:w-auto">Frequently Asked Questions</Button>
    </nav>
  </Container>;
}
