"use client";

import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import { pluralizeQuantityMetric } from "@/lib/helpers/pluralizeQuantityMetric";
import { useState } from "react";
import RichTextContent from "@/components/atoms/RichTextContent/RichTextContent";

const OtherMaterialInfo = ({
  description,
  subCategory,
  storeName,
  availableQuantity,
  quantityMetric,
}: {
  description: string;
  availableQuantity: number;
  subCategory: string;
  storeName: string;
  quantityMetric: string;
}) => {
  const [tab, setTab] = useState("description");
  const tabOptions = ["description", "specifications"];

  const quantity = numberWithCommas(availableQuantity);
  const formattedQuantityMetric = pluralizeQuantityMetric(
    availableQuantity,
    quantityMetric,
  );

  return (
    <div className="py-4 sm:px-4 px-2 space-y-4 rounded-[8px] bg-white">
      <div className="flex items-center gap-2.5">
        {tabOptions?.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`capitalize py-1 px-2.5 rounded-[24px] cursor-pointer ${tab === item ? "bg-[#F0FDF5] text-[#18A154]" : "bg-[#F9F9F9]"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="space-y-4 text-[#5E625F] text-sm">
        {tab === "description" ? (
          <RichTextContent value={description} />
        ) : (
          <div className="space-y-2">
            <InfoItem
              label="Store name"
              value={storeName || "N/A"}
              className=""
              variant="sm"
              labelClass="text-[#707471]"
            />
            <InfoItem
              label="Sub category:"
              value={subCategory}
              className=""
              variant="sm"
              labelClass="text-[#707471]"
            />
            <InfoItem
              label="Available Qty:"
              value={`${quantity} ${formattedQuantityMetric}`}
              className=""
              variant="sm"
              labelClass="text-[#707471]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherMaterialInfo;
