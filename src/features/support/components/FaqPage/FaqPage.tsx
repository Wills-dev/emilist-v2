import Container from "@/components/atoms/Container/Container";
import Button from "@/components/atoms/Button/Button";
import { routes } from "@/lib/helpers/routes";
import SupportFaqPanel from "../SupportFaqPanel/SupportFaqPanel";

export default function FaqPage() {
  return <div className="bg-[#F4F7F5] py-8 sm:py-14"><Container className="space-y-8">
    <header className="max-w-2xl space-y-3"><p className="text-sm font-semibold text-[#18A154]">Emilist help</p><h1 className="font-exo text-3xl font-bold text-[#303632] sm:text-4xl">Frequently Asked Questions</h1><p className="text-sm leading-7 text-[#5E625F] sm:text-base">Browse answers about using Emilist, managing jobs, and making payments.</p></header>
    <div className="overflow-hidden rounded-xl border border-[#E2E8ED]"><SupportFaqPanel /></div>
    <section className="flex flex-wrap items-center justify-between gap-5 rounded-xl bg-white p-6"><div><h2 className="font-exo text-lg font-semibold text-[#303632]">Still need help?</h2><p className="mt-2 text-sm text-[#737774]">Visit our Help Center to contact the team or open a support ticket.</p></div><Button href={routes.helpCenter} variant="primary" className="h-11">Visit Help Center</Button></section>
  </Container></div>;
}
