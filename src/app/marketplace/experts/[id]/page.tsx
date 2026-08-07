import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import DashboardExpertInfoWrapper from "@/features/experts/components/DashboardExpertInfoWrapper/DashboardExpertInfoWrapper";

const PublicExpertInfoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <MainLayout variant="secondary">
      <MarketplaceBanner
        bgText="vetted service providers"
        endText="around you in minutes"
        src="/assets/images/experts.svg"
        type="experts"
        className="bg-linear-to-b from-[#0F6B4B] to-[#215342]"
      />
      <DashboardExpertInfoWrapper expertId={id} publicPage />
    </MainLayout>
  );
};

export default PublicExpertInfoPage;
