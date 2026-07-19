"use client";

import BackButton from "@/components/atoms/BackButton/BackButton";
import DatedPosted from "@/components/atoms/DatedPosted/DatedPosted";
import FlagActionBtn from "@/components/atoms/FlagActionBtn/FlagActionBtn";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import ItemName from "@/components/atoms/ItemName/ItemName";
import LikeButton from "@/components/molecules/LikeButton/LikeButton";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import QuantityControl from "@/components/molecules/QuantityControl/QuantityControl";
import ShareButton from "@/components/molecules/ShareButton/ShareButton";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";
import OtherMaterialInfo from "../OtherMaterialInfo/OtherMaterialInfo";
import Button from "@/components/atoms/Button/Button";
import ImageSliderWrapper from "@/components/molecules/ImageSliderWrapper/ImageSliderWrapper";

import { ProductReviewResponse } from "../../types";
import CompareBtn from "@/components/atoms/CompareBtn/CompareBtn";
import PromoteBtn from "@/components/atoms/PromoteBtn/PromoteBtn";

const MaterialMainInfo = ({
  material,
}: {
  material: ProductReviewResponse;
}) => {
  const { product, averageRating, liked, numberOfRatings } = material;
  const location = product.deliveryLocations[0];
  const locationText = [location?.lga, location?.state]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex-1 w-full">
      {" "}
      <div className="flex items-center justify-between space-y-4">
        <BackButton />
        <FlagActionBtn onClick={() => {}} actionTitle="Flag listing" />
      </div>
      <div className="bg-[#F9F9F9] border-[0.94px] border-[#F1F2F9] pt-8 md:px-11 sm:px-5 px-2  pb-6 rounded-[11.33px] space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-end justify-between border-b border-[#ECECEC] pb-4">
              <div className="space-y-2">
                <DatedPosted date={product.createdAt} />
                <div className="flex items-center flex-wrap gap-4">
                  <ItemName title={product.name} />
                  <IdentifierBadge label="Listing ID" value={product._id} />
                </div>
              </div>
              <div className="gap-2.5 flex flex-col items-end">
                <PriceWrapper
                  price={product.price}
                  currency={product.currency}
                  title="starts from"
                  unit={product.priceMetric}
                />
                <QuantityControl id={product._id} quantity={0} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-[#ECECEC]">
              <div className="border border-[#F1F2F9] bg-white p-4 max-sm:py-2 max-sm:px-3 max-w-106.25 w-full rounded-[8px] space-y-6">
                <div className="flex items-center gap-6 flex-wrap">
                  <InfoItem
                    label="Location:"
                    value={locationText || "Not specified"}
                    className="text-[#6667FF]"
                    variant="sm"
                  />
                  <InfoItem
                    label="Brand:"
                    value={product.brand}
                    className=""
                    variant="sm"
                    labelClass="text-[#707471]"
                  />
                  <InfoItem
                    label="Category:"
                    value={product.category.name}
                    className=""
                    variant="sm"
                    labelClass="text-[#707471]"
                  />
                </div>
                <div className="flex items-center gap-6 flex-wrap">
                  <CompareBtn />
                  <PromoteBtn />
                </div>
              </div>
              <div className="flex items-center gap-3.25">
                <ShareButton
                  id={product._id}
                  type={"material"}
                  name={product.name}
                  className="sm:py-[9.86px] py-2 sm:px-[13.14px] px-3 sm:text-2xl text-sm"
                />
                <LikeButton
                  isLiked={liked}
                  onToggleLike={() => {}}
                  className="sm:py-[9.86px] py-2 sm:px-[13.14px] px-3 sm:text-2xl text-sm"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <ImageSliderWrapper
              images={product.images}
              productName={product.name}
            />
            <UserRatingCard
              id={product.userId._id}
              fullName={product.merchantName || product.storeName}
              rating={averageRating}
              noOfReviews={numberOfRatings}
            />
            <OtherMaterialInfo
              description={product.description}
              availableQuantity={product.availableQuantity}
              storeName={product?.storeName}
              quantityMetric={product.quantityMetric}
              subCategory={product?.subCategory}
            />
          </div>
        </div>
        <Button variant="primary" className="w-full h-11">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default MaterialMainInfo;
