import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CheckoutConfirmationPage from "@/features/payments/components/CheckoutConfirmationPage/CheckoutConfirmationPage";

export default function SubscriptionPaymentCompletePage() {
  return <DashboardLayout><Suspense fallback={<p className="p-6 text-sm">Checking payment…</p>}><CheckoutConfirmationPage kind="subscription" /></Suspense></DashboardLayout>;
}
