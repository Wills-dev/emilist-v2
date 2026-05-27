import DatedPosted from "@/components/atoms/DatedPosted/DatedPosted";
import Dot from "@/components/atoms/Dot/Dot";
import ItemImage from "@/components/atoms/ItemImage/ItemImage";
import ItemName from "@/components/atoms/ItemName/ItemName";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import QuantityControl from "@/components/molecules/QuantityControl/QuantityControl";
import UserProfileCard from "@/components/molecules/UserProfileCard/UserProfileCard";
import MaterialCardActions from "../MaterialCardActions/MaterialCardActions";

const MaterialCard = ({
  productName,
  imgUrl,
  price,
  unit,
  id,
  location,
  createdAt,
  isLiked,
  currency,
  profileImg,
  fullName,
  rating,
  noOfReviews,
}: {
  productName: string;
  imgUrl: string;
  price: number;
  unit: string;
  id: string;
  location: string;
  createdAt: string;
  isLiked: boolean;
  currency: string;
  profileImg?: string;
  fullName: string;
  rating: number;
  noOfReviews: number;
}) => {
  const toggleLike = () => {};

  return (
    <div className="max-w-[375.5px] w-full min-w-72.5 px-2 pt-2 pb-3 bg-[#F9F9F9] rounded-[8px]">
      <div className="space-y-4">
        <div className="p-2.5 bg-white rounded-[12px]">
          <ItemImage src={imgUrl} alt={productName} />
        </div>
        <div className="flex justify-between border-b border-[#ECECEC] pb-2">
          <div className="max-w-50 w-full space-y-2.5">
            <ItemName title={productName} />
            <div className="flex items-center gap-1">
              <Dot variant="purple" className="w-1 h-1" />
              <p className="text-[#6667FF] font-medium text-xs tracking-[-3%] leading-[22.7px] truncate">
                {location}
              </p>
            </div>
          </div>
          <div className="space-y-2.5 flex flex-col items-end">
            <QuantityControl id={id} quantity={10} />
            <PriceWrapper price={price} currency={currency} unit={unit} />
          </div>
        </div>
        <div className="space-y-4">
          <UserProfileCard
            id={id}
            isLiked={isLiked}
            fullName={fullName}
            rating={rating}
            noOfReviews={noOfReviews}
            imgUrl={profileImg}
            handleToggleLike={toggleLike}
            type="material"
          />
          <DatedPosted date={createdAt} />
        </div>
        <MaterialCardActions materialId={id} />
      </div>
    </div>
  );
};

export default MaterialCard;
