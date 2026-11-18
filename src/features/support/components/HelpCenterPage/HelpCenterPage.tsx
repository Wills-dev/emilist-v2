import Image from "next/image";
import Link from "next/link";
import { BookOpen, LifeBuoy, Mail } from "lucide-react";
import Container from "@/components/atoms/Container/Container";
import { routes } from "@/lib/helpers/routes";
import SupportContact from "../SupportContact/SupportContact";

const helpLinks = [
  { title: "Frequently asked questions", description: "Find answers about your account, jobs, and payments.", href: routes.faq, icon: BookOpen },
  { title: "Tickets and invoice disputes", description: "Sign in to create a support ticket, follow a conversation, or view an existing dispute. Raise invoice disputes from the job’s invoice or payments tab.", href: routes.dashboardLinks.support, icon: LifeBuoy },
  { title: "Email our team", description: "Contact us directly when you need more help.", href: "mailto:help@emilist.com.ng", icon: Mail },
];

export default function HelpCenterPage() {
  return <div className="bg-[#F4F7F5] py-8 sm:py-14"><Container className="space-y-8">
    <header className="max-w-2xl space-y-3"><p className="text-sm font-semibold text-[#18A154]">Emilist support</p><h1 className="font-exo text-3xl font-bold text-[#303632] sm:text-4xl">Help Center</h1><p className="text-sm leading-7 text-[#5E625F] sm:text-base">Find the right place to get help with Emilist, contact our team, or follow up on a support request.</p></header>
    <div className="grid gap-4 lg:grid-cols-3">{helpLinks.map((link) => <Link key={link.title} href={link.href} className="space-y-4 rounded-xl border border-[#E2E8ED] bg-white p-6 transition-colors hover:border-[#25C269] focus-visible:outline-2 focus-visible:outline-[#25C269]"><link.icon className="size-6 text-[#18A154]" /><h2 className="font-exo text-lg font-semibold text-[#303632]">{link.title}</h2><p className="text-sm leading-6 text-[#737774]">{link.description}</p><span className="inline-block text-sm font-semibold text-[#18A154]">Get help →</span></Link>)}</div>
    <SupportContact />
    <div className="relative h-64 overflow-hidden rounded-xl bg-[#D8D8D8] sm:h-96"><Image src="/assets/images/support-img.svg" alt="Emilist customer support team" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" /></div>
  </Container></div>;
}
