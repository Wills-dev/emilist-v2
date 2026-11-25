import { createPageMetadata } from "@/lib/seo/metadata";
import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CheckoutConfirmationPage from "@/features/payments/components/CheckoutConfirmationPage/CheckoutConfirmationPage";

export const metadata = createPageMetadata({"title": "Job Payment Confirmation", "description": "Job Payment Confirmation on Emilist.", "index": false});



export default function JobPaymentCompletePage() {
  return <DashboardLayout><Suspense fallback={<p className="p-6 text-sm">Checking payment…</p>}><CheckoutConfirmationPage kind="job" /></Suspense></DashboardLayout>;
}
