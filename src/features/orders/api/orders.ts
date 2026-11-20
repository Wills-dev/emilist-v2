import { axiosInstance } from "@/lib/axiosInstance";
import type { Cart } from "@/features/materials/types";
import type {
  BulkCancelResult,
  CustomerOrder,
  OrdersPage,
  OrdersQuery,
  OrderTracking,
} from "../types/order";

interface ApiResponse<T> {
  data: T;
}

export const fetchOrders = async (
  query: OrdersQuery,
): Promise<OrdersPage> => {
  const { data } = await axiosInstance.get<ApiResponse<OrdersPage>>("/orders", {
    params: {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy: query.sortBy ?? "latest",
      ...(query.status ? { status: query.status } : {}),
    },
  });
  return data.data;
};

export const fetchOrder = async (orderId: string): Promise<CustomerOrder> => {
  const { data } = await axiosInstance.get<ApiResponse<CustomerOrder>>(
    `/orders/${encodeURIComponent(orderId)}`,
  );
  return data.data;
};

export const trackOrder = async (orderId: string): Promise<OrderTracking> => {
  const { data } = await axiosInstance.get<ApiResponse<OrderTracking>>(
    `/orders/${encodeURIComponent(orderId)}/track`,
  );
  return data.data;
};

export const cancelOrder = async ({
  orderId,
  reason,
}: {
  orderId: string;
  reason: string;
}): Promise<void> => {
  await axiosInstance.post(
    `/orders/${encodeURIComponent(orderId)}/cancel`,
    { reason },
  );
};

export const bulkCancelOrders = async (
  orderIds: string[],
): Promise<BulkCancelResult[]> => {
  const { data } = await axiosInstance.post<ApiResponse<BulkCancelResult[]>>(
    "/orders/bulk-cancel",
    { orderIds },
  );
  return data.data;
};

export const returnOrder = async ({
  orderId,
  reason,
}: {
  orderId: string;
  reason: string;
}): Promise<void> => {
  await axiosInstance.post(
    `/orders/${encodeURIComponent(orderId)}/return`,
    { reason },
  );
};

export const reorderOrder = async (orderId: string): Promise<Cart> => {
  const { data } = await axiosInstance.post<ApiResponse<Cart>>(
    `/orders/${encodeURIComponent(orderId)}/reorder`,
  );
  return data.data;
};

export const rateOrderedProduct = async ({
  orderId,
  productId,
  rating,
  comment,
}: {
  orderId: string;
  productId: string;
  rating: number;
  comment?: string;
}): Promise<void> => {
  await axiosInstance.post(
    `/orders/${encodeURIComponent(orderId)}/rate-merchant`,
    { productId, rating, ...(comment ? { comment } : {}) },
  );
};
