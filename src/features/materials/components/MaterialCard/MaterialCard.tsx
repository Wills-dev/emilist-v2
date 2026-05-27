import DatedPosted from "@/components/atoms/DatedPosted/DatedPosted";
import ItemImage from "@/components/atoms/ItemImage/ItemImage";
import ItemName from "@/components/atoms/ItemName/ItemName";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import QuantityControl from "@/components/molecules/QuantityControl/QuantityControl";
import UserProfileCard from "@/components/molecules/UserProfileCard/UserProfileCard";
import MaterialCardActions from "../MaterialCardActions/MaterialCardActions";
import DotInfoItem from "@/components/atoms/DotInfoItem/DotInfoItem";

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
        <div className="flex justify-between gap-2 border-b border-[#ECECEC] pb-2">
          <div className="max-w-50 w-full space-y-2.5">
            <ItemName title={productName} />
            <DotInfoItem desc={location} variant="purple" />
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
