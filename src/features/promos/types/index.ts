export interface PromoProduct {
  id: string;
  name: string;
  status?: string;
  isDeleted?: boolean;
}
export interface SellerPromo {
  id: string;
  code: string;
  discountPercentage: number;
  expiryDate: string;
  isActive: boolean;
  isSingleUse: boolean;
  useCount: number;
  products: PromoProduct[];
}
export interface CreatePromoPayload {
  code?: string;
  productIds: string[];
  discountPercentage: number;
  expiryDate: string;
  isSingleUse: boolean;
}
export type UpdatePromoPayload = Partial<Pick<CreatePromoPayload, "productIds" | "discountPercentage" | "expiryDate">> & { isActive?: boolean };
export interface PromoFormValues {
  code: string;
  productIds: string[];
  discountPercentage: string;
  expiryDate: string;
  isSingleUse: boolean;
  isActive: boolean;
}
export type PromoView = { kind: "list" } | { kind: "create" } | { kind: "edit"; promo: SellerPromo } | { kind: "delete"; promo: SellerPromo };
