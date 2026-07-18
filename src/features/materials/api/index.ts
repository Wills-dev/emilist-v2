import { axiosInstance } from "@/lib/axiosInstance";
import { PostMaterialPayload, ProductReviewResponse } from "../types";

export const postMaterial = async (payload: PostMaterialPayload) => {
  try {
    const url = `/material/create-product`;

    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("category", payload.category);
    formData.append("subCategory", "card");
    formData.append("brand", payload.brand);
    formData.append("description", payload.description);
    formData.append("availableQuantity", String(payload.availableQuantity));
    formData.append("quantityMetric", payload.quantityMetric.toLowerCase());
    formData.append("price", String(payload.price));
    formData.append("priceMetric", payload.priceMetric.toLowerCase());
    formData.append("currency", payload.currency);
    formData.append("merchantName", payload.merchantName);
    formData.append("storeName", "keez");
    formData.append("isDiscounted", String(payload.isDiscounted));

    payload.deliveryLocations.forEach((location, index) => {
      formData.append(`deliveryLocations[${index}][state]`, location.state);
      formData.append(`deliveryLocations[${index}][lga]`, location.lga);
    });

    if (payload.images && payload.images.length > 0) {
      payload.images.forEach((image) => {
        formData.append("files", image);
      });
    }

    const { data } = await axiosInstance.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMaterial = async ({
  page,
  limit,
  search,
  category,
  brand,
  minPrice,
  maxPrice,
  status,
  sortBy,
  sortOrder,
}: {
  page: number;
  limit: number;
  search?: string | null;
  category?: string;
  brand?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  status?: string | null;
  sortBy?: string | null;
  sortOrder?: string | null;
}) => {
  try {
    const rawParams = {
      page,
      limit,
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      status,
      sortBy,
      sortOrder,
    };

    const params = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      ),
    );

    const url = `/material/fetch-all-products`;

    const { data } = await axiosInstance.get(url, {
      params,
    });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const getMaterialInfo = async (
  id: string,
): Promise<ProductReviewResponse> => {
  try {
    const url = `/material/fetch-product/${id}`;
    const { data } = await axiosInstance.get(url);
    return data?.data as ProductReviewResponse;
  } catch (error) {
    throw error;
  }
};
