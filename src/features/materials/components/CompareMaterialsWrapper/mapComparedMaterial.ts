import { pluralizeQuantityMetric } from "@/lib/helpers/pluralizeQuantityMetric";
import { ComparedProduct } from "../../types";
import { CompareMaterialItem } from "../CompareMaterialCard/types";

export const mapComparedMaterial = (
  product: ComparedProduct,
): CompareMaterialItem => {
  const image =
    product.images.find((item) => item.isPrimary)?.imageUrl ??
    product.images[0]?.imageUrl ??
    "/assets/images/material.svg";
  const location = product.deliveryLocations[0];
  const metric = pluralizeQuantityMetric(
    product.availableQuantity,
    product.quantityMetric,
  );

  return {
    id: product._id,
    name: product.name,
    image,
    price: product.discountedPrice ?? product.price,
    currency: product.currency,
    unit: product.priceMetric,
    quantitySummary: `${product.availableQuantity} ${metric} available`,
    location:
      [location?.lga, location?.state].filter(Boolean).join(", ") ||
      "Not specified",
    rating: product.averageRating ?? 0,
    deliveryTime: "Not specified",
    merchantRating: undefined,
    reviewCount: product.totalReviews ?? product.reviews.length,
    merchantId: product.userId._id,
    disclaimer: product.description,
  };
};
