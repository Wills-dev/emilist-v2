import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CheckoutWrapper from "@/features/materials/components/CheckoutWrapper/CheckoutWrapper";

const DashboardCheckoutPage = () => (
  <DashboardLayout>
    <CheckoutWrapper isDashboard />
  </DashboardLayout>
);

export default DashboardCheckoutPage;
