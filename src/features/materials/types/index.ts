export interface DeliveryLocation {
  state: string;
  lga: string;
}

export interface PostMaterialPayload {
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  description: string;
  availableQuantity: number;
  quantityMetric: string;
  price: number;
  priceMetric: string;
  currency: string;
  merchantName: string;
  storeName: string;
  deliveryLocations: DeliveryLocation[];
  isDiscounted: boolean;
  images?: File[];
}

export type PostMaterialField = keyof PostMaterialPayload;
