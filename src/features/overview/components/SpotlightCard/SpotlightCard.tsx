import { Megaphone } from "lucide-react";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";

import type { DashboardOverview } from "../../types/api";

const SpotlightCard = ({ spotlight }: { spotlight: DashboardOverview["spotlight"] }) => (
  <section className="bg-white">
    <h2 className="flex items-center gap-2 border-b border-[#ECECEC] p-4 font-exo font-semibold">
      <Megaphone className="size-4" />
      Spotlight:
      <span className="font-sans text-sm font-normal">
        Service Provider of the Week
      </span>
    </h2>
    <div className="p-6">
      {spotlight ? <div className="space-y-3"><UserRatingCard
        id={spotlight.businessId}
        profileHref={`/dashboard/marketplace/experts/${encodeURIComponent(spotlight.businessId)}`}
        fullName={spotlight.user.fullName || spotlight.user.userName || spotlight.businessName}
        detail={spotlight.services[0] || spotlight.businessName}
        rating={spotlight.averageRating}
        noOfReviews={spotlight.totalReviews}
        imgUrl={spotlight.user.displayImage || undefined}
        avatarVariant="large"
        isVerified={spotlight.expertType.toLowerCase() === "verified"}
      /><p className="text-xs text-[#737774]">{spotlight.businessName}</p><p className="text-xs text-[#737774]">{spotlight.averageRating} / 5 · {spotlight.totalReviews} reviews</p></div> : <p className="text-sm text-[#737774]">No spotlight provider available.</p>}
    </div>
  </section>
);

export default SpotlightCard;
