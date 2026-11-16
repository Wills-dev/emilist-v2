import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import WalletFundingReturn from "@/features/payments/components/WalletFundingReturn/WalletFundingReturn";

export default function FundingCompletePage() {
  return <DashboardLayout><Suspense fallback={<p className="p-6 text-sm">Checking payment…</p>}><WalletFundingReturn /></Suspense></DashboardLayout>;
}
