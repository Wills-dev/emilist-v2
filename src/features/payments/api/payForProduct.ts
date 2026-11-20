import { axiosInstance } from "@/lib/axiosInstance";
import type {
  PayForCartPayload,
  PayForCartResponse,
} from "../types/cartPayment";

interface ApiResponse<T> {
  data: T;
}

export const payForCart = async (
  payload: PayForCartPayload,
): Promise<PayForCartResponse> => {
  const { data } = await axiosInstance.post<ApiResponse<PayForCartResponse>>(
    "/material/pay-for-product",
    payload,
  );
  return data.data;
};
