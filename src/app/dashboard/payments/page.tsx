import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import PaymentsWrapper from "@/features/payments/components/PaymentsWrapper/PaymentsWrapper";

const PaymentsPage = () => <DashboardLayout><Suspense fallback={<p className="p-6 text-sm">Loading payments…</p>}><PaymentsWrapper /></Suspense></DashboardLayout>;

export default PaymentsPage;
