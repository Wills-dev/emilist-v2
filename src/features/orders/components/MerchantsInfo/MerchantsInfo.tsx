import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import Rating from "@/components/molecules/Rating/Rating";

const MerchantsInfo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="md:hidden">
        <ProfileAvatar variant="very-small" profileImage="" />
      </div>
      <div className="flex md:items-center max-md:flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="text-xs text-[#5E625F]">Arthur Phillips</p>
          <Rating rating={4} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-exo">511 reviews</span>
          <span className="text-[10px] font-exo">1000 items sold</span>
        </div>
      </div>
    </div>
  );
};

export default MerchantsInfo;
