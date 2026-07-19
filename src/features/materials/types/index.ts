import { RatingDistribution, Review } from "@/lib/types/review";

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

export interface AddMaterialReviewPayload {
  comment: string;
  productId: string;
  rating: number;
}

export interface ProductReviewResponse {
  averageRating: number;
  isCompared: boolean;
  liked: boolean;
  numberOfRatings: number;
  product: Product;
  ratingDistribution: RatingDistribution;
  reviewsData: Review[];
}

export interface MaterialReviewsResponse {
  averageRating?: number;
  numberOfRatings?: number;
  ratingDistribution?: RatingDistribution;
  reviews?: Review[];
  pagination?: {
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

export interface Product {
  _id: string;
  availableQuantity: number;
  brand: string;
  category: Category;
  clicks: Clicks;
  createdAt: string;
  currency: string;
  deliveryLocations: DeliveryLocation[];
  description: string;
  images: ProductImage[];
  isDeleted: boolean;
  isDiscounted: boolean;
  merchantName: string;
  name: string;
  price: number;
  priceMetric: string;
  quantityMetric: string;
  reviews: Review[];
  slug: string;
  status: "active" | "inactive";
  storeName: string;
  subCategory: string;
  updatedAt: string;
  userId: ProductOwner;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Clicks {
  users: string[];
  clickCount: number;
}

export interface DeliveryLocation {
  [key: string]: unknown;
}

export type ProductImage =
  | string
  | {
      url?: string;
      secure_url?: string;
      imageUrl?: string;
      [key: string]: unknown;
    };

export interface ProductOwner {
  _id: string;
  email: string;
  uniqueId: string;
  level: string;
}
