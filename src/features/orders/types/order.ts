export type OrderDeliveryStatus =
  | "orderConfirmed"
  | "outForDelivery"
  | "delivered"
  | "canceled"
  | "returned";

export type OrderPaymentStatus = "unpaid" | "pending" | "paid" | "failed";
export type OrderStatus = "pending" | "completed" | "canceled";
export type OrderSort =
  | "latest"
  | "oldest"
  | "total_high_low"
  | "total_low_high";

export interface OrderProduct {
  _id?: string;
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  brand?: string;
  categoryName?: string;
  thumbnail?: string;
  quantityMetric?: string;
  merchantId: string;
  merchantName: string;
  merchantRating?: number;
  merchantReviewCount?: number;
  totalUnitsSoldAtPurchase?: number;
  discountAmount: number;
  promoCode?: string;
  taxPercentage: number;
  taxAmount: number;
}

export interface CustomerOrder {
  _id: string;
  userId: string;
  cartId: string;
  products: OrderProduct[];
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  discountApplied: boolean;
  promoCodes: string[];
  originalTotalAmount?: number;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  deliveryStatus: OrderDeliveryStatus;
  shippingAddress?: string;
  orderNote?: string;
  deliveryDate?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
  returnedAt?: string | null;
  cancellationReason?: string;
  returnReason?: string;
  deliverySteps?: Array<{
    status: OrderDeliveryStatus;
    timestamp: string;
    note?: string;
  }>;
  createdAt: string;
  updatedAt?: string;
}

export interface OrdersPagination {
  total: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface OrdersPage {
  orders: CustomerOrder[];
  pagination: OrdersPagination;
}

export interface OrdersQuery {
  page?: number;
  limit?: number;
  sortBy?: OrderSort;
  status?: OrderDeliveryStatus;
}

export interface OrderTracking {
  deliveryStatus: OrderDeliveryStatus;
  deliveryDate: string | null;
  deliveredAt: string | null;
  timeline: Array<{
    status: OrderDeliveryStatus;
    timestamp: string;
    note?: string;
  }>;
}

export interface BulkCancelResult {
  orderId: string;
  success: boolean;
  message: string;
}
