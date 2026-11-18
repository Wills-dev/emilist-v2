import type { Metadata } from "next";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import HelpCenterPage from "@/features/support/components/HelpCenterPage/HelpCenterPage";
export const metadata: Metadata = { title: "Help Center | Emilist", description: "Find help with Emilist, contact support, and manage support tickets and invoice disputes." };
export default function Page() { return <MainLayout><HelpCenterPage /></MainLayout>; }
