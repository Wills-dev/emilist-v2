import type { PromoProduct, SellerPromo } from "../types";
const object = (value: unknown): Record<string, unknown> => value && typeof value === "object" ? value as Record<string, unknown> : {};
const text = (value: unknown) => typeof value === "string" ? value : "";
export const promoProduct = (value: unknown): PromoProduct => {
  if (typeof value === "string") return { id: value, name: "Product" };
  const item = object(value);
  return { id: text(item._id) || text(item.id), name: text(item.name) || text(item.productName) || "Product", status: text(item.status) || undefined, isDeleted: item.isDeleted === true };
};
export const normalizePromo = (value: unknown): SellerPromo => {
  const item = object(value);
  const id = text(item._id) || text(item.id);
  if (!id || !text(item.code) || !Number.isFinite(Number(item.discountPercentage)) || !Number.isFinite(Date.parse(text(item.expiryDate)))) throw new Error("The promo response is missing required information.");
  return { id, code: text(item.code), discountPercentage: Number(item.discountPercentage), expiryDate: text(item.expiryDate), isActive: item.isActive === true, isSingleUse: item.isSingleUse === true, useCount: Number(item.useCount) || 0, products: Array.isArray(item.productIds) ? item.productIds.map(promoProduct).filter((product) => product.id) : [] };
};
export const normalizePromos = (value: unknown): SellerPromo[] => {
  const items = Array.isArray(value) ? value : object(value).promos;
  if (!Array.isArray(items)) throw new Error("Unable to read your promos. Please try again.");
  return items.map(normalizePromo);
};
export const normalizePromoProducts = (value: unknown, page: number) => {
  const entry = object(value);
  const items = Array.isArray(value) ? value : entry.products;
  if (!Array.isArray(items)) throw new Error("Unable to read your listed products.");
  const pagination = object(entry.pagination);
  const currentPage = Number(pagination.currentPage ?? entry.currentPage ?? page);
  const totalPages = Number(pagination.totalPages ?? entry.totalPages);
  const hasNext = pagination.hasNextPage ?? pagination.hasNext ?? entry.hasNextPage;
  return { products: items.map(promoProduct).filter((product) => product.id), nextPage: hasNext === true || (Number.isFinite(totalPages) && currentPage < totalPages) || (hasNext === undefined && !Number.isFinite(totalPages) && items.length === 50) ? page + 1 : undefined };
};
