import type { Metadata } from "next";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import FaqPage from "@/features/support/components/FaqPage/FaqPage";
export const metadata: Metadata = { title: "Frequently Asked Questions | Emilist", description: "Answers to common questions about Emilist accounts, jobs, and payments." };
export default function Page() { return <MainLayout><FaqPage /></MainLayout>; }
