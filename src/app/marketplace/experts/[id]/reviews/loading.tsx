import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import ProfileSkeleton from "@/features/profiles/components/ProfileSkeleton/ProfileSkeleton";
export default function Loading() {
  return (
    <MainLayout variant="secondary">
      <MarketplaceBanner
        bgText="vetted service providers"
        endText="around you in minutes"
        src="/assets/images/experts.svg"
        type="experts"
        className="bg-linear-to-b from-[#0F6B4B] to-[#215342]"
      />
      <ProfileSkeleton artisan reviewsPage />
    </MainLayout>
  );
}
