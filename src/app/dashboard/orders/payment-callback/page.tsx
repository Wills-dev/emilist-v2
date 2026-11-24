import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CartPaymentCallback from "@/features/payments/components/CartPaymentCallback/CartPaymentCallback";

const CartPaymentCallbackPage = () => (
  <DashboardLayout>
    <Suspense fallback={<p className="p-6 text-sm">Checking payment…</p>}>
      <CartPaymentCallback />
    </Suspense>
  </DashboardLayout>
);

export default CartPaymentCallbackPage;
