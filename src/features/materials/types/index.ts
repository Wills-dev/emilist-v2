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

export type UpdateMaterialPayload = Partial<
  Omit<PostMaterialPayload, "images">
> & {
  images?: File[];
};

export type PostMaterialField = keyof PostMaterialPayload;

export interface AddMaterialReviewPayload {
  comment: string;
  productId: string;
  rating: number;
}

export interface FlagMaterialPayload {
  reason: string;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface ApplyDiscountCodePayload {
  code: string;
}

export interface CartProduct {
  _id: string;
  name: string;
  brand?: string;
  category?: string | { name?: string };
  currency?: string;
  images?: ProductImage[];
  merchantName?: string;
  price?: number;
  quantityMetric?: string;
}

export interface CartItem {
  _id: string;
  lineTotal: number;
  price: number;
  productId: CartProduct | string;
  quantity: number;
}

export interface CartOrderSummary {
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
}

export interface Cart {
  _id: string;
  cartQuantity?: number;
  orderSummary?: CartOrderSummary;
  products?: CartItem[];
  totalAmount?: number;
}

export interface ProductReviewResponse {
  averageRating: number;
  isCompared: boolean;
  numberOfRatings: number;
  product: Product;
  ratingDistribution: RatingDistribution;
  reviewsData: Review[];
  isLiked: boolean;
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

/** A material returned by GET /material/fetch-all-products. */
export interface MaterialListItem {
  id: string;
  name: string;
  slug?: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  brand: string;
  description: string;
  availableQuantity: number;
  price: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  reviewCount: number;
  stockStatus: string;
  isAvailable: boolean;
  thumbnail?: string | null;
  images: Array<{
    url: string;
    order: number;
  }>;
  unit: string;
  minimumOrder: number;
  maximumOrder: number | null;
  isFeatured: boolean;
  totalUnitsSold: number;
  averageRating: number;
  isLiked?: boolean;
  merchant: {
    id: string;
    businessName: string;
    displayName: string;
    logo: string | null;
    rating: number;
    totalReviews: number;
    verified: boolean;
    phone: string;
    email: string;
  };
  delivery: {
    state: string;
    city: string;
  } | null;
}

export interface MaterialListResponse {
  data: MaterialListItem[];
  meta: {
    total: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    nextPage: number | null;
    previousPage: number | null;
  };
}

export interface OtherSellerProduct {
  _id: string;
  userId: ProductOwner & {
    isPrimeMember?: boolean;
  };
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  description: string;
  images: Array<{
    imageUrl: string;
    isPrimary: boolean;
    _id: string;
  }>;
  availableQuantity: number;
  quantityMetric: string;
  price: number;
  currency: string;
  priceMetric: string;
  merchantName: string;
  storeName: string;
  deliveryLocations: Array<{
    state: string;
    lga: string;
  }>;
  isDiscounted: boolean;
  status: "active" | "inactive";
  reviews: Array<{
    _id: string;
    rating: number;
  }>;
  createdAt: string;
  updatedAt: string;
  discountedPrice?: number;
  liked: boolean;
  isCompared: boolean;
}

export interface OtherSellerProductsResponse {
  products: OtherSellerProduct[];
  currentPage: string;
  totalPages: number;
  limit: string;
  totalProducts: number;
}

export interface SimilarProduct {
  _id: string;
  name: string;
  images: Array<{
    imageUrl: string;
    isPrimary: boolean;
    _id: string;
  }>;
  availableQuantity: number;
  quantityMetric: string;
  price: number;
  currency: string;
  priceMetric: string;
  merchantName: string;
  deliveryLocations: Array<{
    state: string;
    lga: string;
  }>;
  isDiscounted: boolean;
  createdAt: string;
  user: {
    _id: string;
  };
  averageRating: number | null;
  numberOfRatings: number;
}

export interface SimilarProductsResponse {
  similarProducts: SimilarProduct[];
}
