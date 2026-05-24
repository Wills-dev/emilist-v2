import CustomerCommentSection from "@/components/organisms/CustomerCommentSection/CustomerCommentSection";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import HireExpertGuideSection from "@/components/organisms/HireExpertGuideSection/HireExpertGuideSection";
import ServiceSection from "@/components/organisms/ServiceSection/ServiceSection";
import TrustSection from "@/components/organisms/TrustSection/TrustSection";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ServiceSection />
      <TrustSection />
      <CustomerCommentSection />
      <HireExpertGuideSection />
    </MainLayout>
  );
}
