import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import ServiceSection from "@/components/organisms/ServiceSection/ServiceSection";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ServiceSection />
    </MainLayout>
  );
}
