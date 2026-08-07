import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import DashboardExpertReviews from "@/features/experts/components/DashboardExpertReviews/DashboardExpertReviews";

const PublicExpertReviewsPage = async ({
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
      <DashboardExpertReviews expertId={id} publicPage />
    </MainLayout>
  );
};

export default PublicExpertReviewsPage;
