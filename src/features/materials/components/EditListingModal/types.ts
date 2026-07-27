import { OtherSellerProduct } from "../../types";

export type EditListingFormValues = {
  name: string;
  brand: string;
  description: string;
  availableQuantity: string;
  quantityMetric: string;
  price: string;
  currency: string;
  priceMetric: string;
  state: string;
  lga: string;
  merchantName: string;
};

export type ExistingMaterialImage = OtherSellerProduct["images"][number];

export type SetEditListingField = (
  field: keyof EditListingFormValues,
  value: string,
) => void;
