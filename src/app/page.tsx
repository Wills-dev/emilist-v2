import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import ServiceSection from "@/components/organisms/ServiceSection/ServiceSection";
import TrustSection from "@/components/organisms/TrustSection/TrustSection";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ServiceSection />
      <TrustSection />
    </MainLayout>
  );
}
