import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";

const MarketplaceJobWrapper = () => {
  return (
    <div>
      <MarketplaceBanner
        bgText="verified job offers around"
        endText="your location, in minutes"
        src="/assets/images/jobs.svg"
        type="jobs"
      />
    </div>
  );
};

export default MarketplaceJobWrapper;
