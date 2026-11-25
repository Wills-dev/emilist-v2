import { createPageMetadata } from "@/lib/seo/metadata";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import HelpCenterPage from "@/features/support/components/HelpCenterPage/HelpCenterPage";

export const metadata = createPageMetadata({"title": "Help Center", "description": "Find help with Emilist accounts, jobs, orders and payments. Get answers to common questions and learn how to contact support.", "index": true, "path": "/help-center"});
export default function Page() { return <MainLayout><HelpCenterPage /></MainLayout>; }
