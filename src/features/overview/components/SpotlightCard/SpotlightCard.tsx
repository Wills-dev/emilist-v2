import { Megaphone } from "lucide-react";
import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import Rating from "@/components/molecules/Rating/Rating";

const SpotlightCard = () => (
  <section className="bg-white">
    <h2 className="flex items-center gap-2 border-b border-[#ECECEC] p-4 font-exo font-semibold">
      <Megaphone className="size-4" />
      Spotlight:
      <span className="font-sans text-sm font-normal">
        Service Provider of the Week
      </span>
    </h2>
    <div className="flex items-center gap-4 p-6">
      <ProfileAvatar
        profileImage="/assets/images/profile-view2.svg"
        variant="large"
      />
      <div className="min-w-0">
        <p className="font-exo font-semibold">Richard Cole E.</p>
        <p className="text-sm text-[#737774]">Furniture Maker</p>
        <div className="mt-2 flex items-center">
          <Rating rating={4} />
          <span className="ml-2 text-xs text-[#8A8D8B]">(380 reviews)</span>
        </div>
      </div>
    </div>
  </section>
);

export default SpotlightCard;
