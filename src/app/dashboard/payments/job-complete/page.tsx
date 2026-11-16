import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CheckoutConfirmationPage from "@/features/payments/components/CheckoutConfirmationPage/CheckoutConfirmationPage";

export default function JobPaymentCompletePage() {
  return <DashboardLayout><Suspense fallback={<p className="p-6 text-sm">Checking payment…</p>}><CheckoutConfirmationPage kind="job" /></Suspense></DashboardLayout>;
}
