export interface CompareMaterialItem {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  unit: string;
  quantitySummary: string;
  location: string;
  rating: number;
  deliveryTime: string;
  merchantRating?: number;
  reviewCount: number;
  merchantId: string;
  disclaimer: string;
}
