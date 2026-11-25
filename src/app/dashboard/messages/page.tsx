import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import MessagesWrapper from "@/features/messages/components/MessagesWrapper/MessagesWrapper";

export const metadata = createPageMetadata({"title": "Messages", "description": "Messages on Emilist.", "index": false});



const MessagesPage = () => (
  <DashboardLayout>
    <MessagesWrapper />
  </DashboardLayout>
);

export default MessagesPage;
