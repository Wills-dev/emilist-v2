import { Megaphone } from "lucide-react";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";

const spotlightUser = {
  id: "richard-cole-e",
  fullName: "Richard Cole E.",
  detail: "Furniture Maker",
  rating: 4,
  noOfReviews: 380,
  imgUrl: "/assets/images/profile-view2.svg",
};

const SpotlightCard = () => (
  <section className="bg-white">
    <h2 className="flex items-center gap-2 border-b border-[#ECECEC] p-4 font-exo font-semibold">
      <Megaphone className="size-4" />
      Spotlight:
      <span className="font-sans text-sm font-normal">
        Service Provider of the Week
      </span>
    </h2>
    <div className="p-6">
      <UserRatingCard
        id={spotlightUser.id}
        fullName={spotlightUser.fullName}
        detail={spotlightUser.detail}
        rating={spotlightUser.rating}
        noOfReviews={spotlightUser.noOfReviews}
        imgUrl={spotlightUser.imgUrl}
        avatarVariant="large"
      />
    </div>
  </section>
);

export default SpotlightCard;
