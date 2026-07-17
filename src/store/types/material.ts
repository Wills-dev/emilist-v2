import {
  DeliveryLocation,
  PostMaterialPayload,
} from "@/features/materials/types";

export interface MaterialFormState {
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  description: string;
  availableQuantity: string;
  quantityMetric: string;
  price: string;
  priceMetric: string;
  currency: string;
  merchantName: string;
  storeName: string;
  deliveryLocations: DeliveryLocation[];
  isDiscounted: boolean;
  images: File[];
  imagePreviews: string[];

  setField: <K extends keyof MaterialFormState>(
    field: K,
    value: MaterialFormState[K],
  ) => void;
  addDeliveryLocation: () => void;
  updateDeliveryLocation: (
    index: number,
    field: keyof DeliveryLocation,
    value: string,
  ) => void;
  removeDeliveryLocation: (index: number) => void;
  setImages: (files: File[], preview: string[]) => void;
  removeImage: (index: number) => void;
  resetForm: () => void;
  getPayload: () => PostMaterialPayload;
}
