"use client";

import Image from "next/image";
import Link from "next/link";

import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import QuantityControl from "@/components/molecules/QuantityControl/QuantityControl";
import ListedCardActionBtns from "../ListedCardActionBtns/ListedCardActionBtns";
import { routes } from "@/lib/helpers/routes";
import { OtherSellerProduct } from "../../types";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import { pluralizeQuantityMetric } from "@/lib/helpers/pluralizeQuantityMetric";
import { useState } from "react";
import EditListingModal from "../EditListingModal/EditListingModal";
import EditPriceModal from "../EditPriceModal/EditPriceModal";
import ArchiveListingModal from "../ArchiveListingModal/ArchiveListingModal";

const ListedCard = ({
  material,
  isLast = false,
}: {
  material: OtherSellerProduct;
  isLast?: boolean;
}) => {
  const [editListingOpen, setEditListingOpen] = useState(false);
  const [editPriceOpen, setEditPriceOpen] = useState(false);
  const [archiveListingOpen, setArchiveListingOpen] = useState(false);
  const image =
    material.images.find((item) => item.isPrimary)?.imageUrl ||
    material.images[0]?.imageUrl ||
    "/assets/images/default-job-image.svg";
  const availableQuantityMetric = pluralizeQuantityMetric(
    material.availableQuantity,
    material.quantityMetric,
  );

  return (
    <div
      className={`w-full ${isLast ? "" : "border-b border-[#F1F2F9] pb-3.5"}`}
    >
      <div className="py-3.5">
        <div className="flex gap-2.5 sm:gap-3.5">
          <div className="h-14 w-14 min-w-14 overflow-hidden rounded-[8.75px] bg-[#ECECF0] md:h-28 md:w-28 md:min-w-28">
            <Image
              src={image}
              alt={material.name}
              width={112}
              height={112}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full flex-1 space-y-3.5">
            <div className="flex flex-wrap items-start justify-between gap-1 sm:gap-4">
              <div className="w-full flex-1 space-y-2">
                <Link
                  href={routes.dashboardLinks.materialInfo(material._id)}
                  className="truncate font-exo text-sm font-semibold hover:underline"
                >
                  {material.name}
                </Link>
                <div className="space-y-1">
                  <div className="flex w-full max-w-141.75 flex-wrap gap-1 sm:gap-3.5">
                    <InfoItem
                      label="Brand:"
                      value={material.brand || "N/A"}
                      variant="xs"
                      className="font-medium text-[#474C48]"
                      labelClass="font-normal text-[#707471]"
                    />
                    <InfoItem
                      label="Category:"
                      value={material.subCategory || material.category || "N/A"}
                      variant="xs"
                      className="font-medium text-[#474C48]"
                      labelClass="font-normal text-[#707471]"
                    />
                  </div>
                  <p className="text-xs text-[#737774] max-sm:hidden">
                    {numberWithCommas(material.availableQuantity)}{" "}
                    {availableQuantityMetric} available
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 sm:items-center">
                <PriceWrapper
                  price={material.discountedPrice ?? material.price}
                  currency={material.currency}
                  title="from"
                  unit={material.priceMetric}
                />
                <button
                  type="button"
                  onClick={() => setEditPriceOpen(true)}
                  className="flex cursor-pointer items-center gap-1 text-xs text-[#6667FF] underline"
                >
                  <span>Edit price</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <QuantityControl
                quantity={material.availableQuantity || 0}
                onIncrement={() => {}}
                onDecrement={() => {}}
                disabled
              />
              <div className="max-md:hidden">
                <ListedCardActionBtns
                  onEditListing={() => setEditListingOpen(true)}
                  onArchiveListing={() => setArchiveListingOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#F1F2F9] pt-3.5 md:hidden">
        <ListedCardActionBtns
          onEditListing={() => setEditListingOpen(true)}
          onArchiveListing={() => setArchiveListingOpen(true)}
        />
      </div>
      {editListingOpen && (
        <EditListingModal
          material={material}
          open={editListingOpen}
          onClose={setEditListingOpen}
        />
      )}
      {editPriceOpen && (
        <EditPriceModal
          material={material}
          open={editPriceOpen}
          onClose={setEditPriceOpen}
        />
      )}
      {archiveListingOpen && (
        <ArchiveListingModal
          productId={material._id}
          open={archiveListingOpen}
          onClose={setArchiveListingOpen}
        />
      )}
    </div>
  );
};

export default ListedCard;
