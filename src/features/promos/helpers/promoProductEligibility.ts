import type { PromoProduct } from "../types";

export const promoProductUnavailableReason = (product: PromoProduct): string | undefined => {
  if (product.isDeleted) return "Promos cannot be created for deleted materials.";
  const status = product.status?.trim().toLowerCase();
  if (status && status !== "active") return `This material is ${product.status}. Only active materials can have promos.`;
};
