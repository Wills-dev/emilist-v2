"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  MapPin,
  MessageSquareText,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import Price from "@/components/atoms/Price/Price";

import { routes } from "@/lib/helpers/routes";
import { CompareMaterialItem } from "./types";
import { useAddToCart } from "../../hooks/useAddToCart";
import CompareInfo from "./CompareInfo";

const CompareMaterialCard = ({
  material,
  index = 0,
}: {
  material: CompareMaterialItem;
  index?: number;
}) => {
  const { handleAddToCart, isAddingToCart } = useAddToCart();

  return (
  <motion.article
    className="w-60 shrink-0 space-y-3 sm:w-72"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.06 }}
  >
    <section className="space-y-3 bg-[#F9F9F9] p-3">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={routes.dashboardLinks.materialInfo(material.id)}
          className="truncate font-exo text-sm font-semibold transition-colors hover:text-[#18A154] hover:underline"
        >
          {material.name}
        </Link>
        <Price
          price={material.price}
          currency={material.currency}
          unit={material.unit}
        />
      </div>
      <div className="flex min-w-0 items-center gap-2 text-[10px]">
        <span className="whitespace-nowrap">• {material.quantitySummary}</span>
        <span className="truncate text-[#6667FF]">• {material.location}</span>
        <span className="ml-auto flex items-center gap-1">
          <Star className="size-3 fill-[#FF9933] text-[#FF9933]" />
          {material.rating.toFixed(1)}
        </span>
      </div>
      <div className="relative h-42 overflow-hidden rounded-[10px] bg-white sm:h-48">
        <Image
          src={material.image}
          alt={material.name}
          fill
          className="object-cover"
        />
      </div>
      <Button
        href={routes.profile(material.merchantId)}
        variant="default"
        className="h-8 w-full text-xs"
      >
        View Merchant Profile
      </Button>
    </section>

    <section className="space-y-3 bg-white p-4 shadow-[0_12px_20px_rgba(27,49,37,0.08)]">
      <div className="space-y-2 border-y border-[#ECECEC] py-4">
        <CompareInfo
          icon={<CalendarDays />}
          label="Delivery time:"
          value={material.deliveryTime}
        />
        <CompareInfo
          icon={<MapPin />}
          label="Location:"
          value={material.location}
        />
        <CompareInfo
          icon={<BadgeCheck />}
          label="Merchant Ratings:"
          value={
            material.merchantRating === undefined
              ? "Not specified"
              : String(material.merchantRating)
          }
        />
        <CompareInfo
          icon={<MessageSquareText />}
          label="Product Reviews:"
          value={String(material.reviewCount)}
        />
      </div>
      <Button
        type="button"
        variant="primary"
        className="h-8 w-full py-1 text-sm"
        loading={isAddingToCart}
        onClick={() => handleAddToCart(material.id, 1)}
      >
        Purchase
      </Button>
    </section>

    <section className="bg-white p-4 shadow-[0_12px_20px_rgba(27,49,37,0.08)]">
      <p className="line-clamp-4 rounded-[10px] bg-[#FBFBFB] p-3 text-xs leading-4 text-[#667085]">
        <span className="underline">Disclaimer:</span> {material.disclaimer}
      </p>
    </section>
  </motion.article>
  );
};

export default CompareMaterialCard;
