import { createPageMetadata } from "@/lib/seo/metadata";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import FaqPage from "@/features/support/components/FaqPage/FaqPage";

export const metadata = createPageMetadata({"title": "Frequently Asked Questions", "description": "Answers to common questions about Emilist accounts, jobs, materials, payments and using the platform.", "index": true, "path": "/faq"});
export default function Page() { return <MainLayout><FaqPage /></MainLayout>; }
