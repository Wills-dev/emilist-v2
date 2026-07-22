import { axiosInstance } from "@/lib/axiosInstance";
import {
  AddMaterialReviewPayload,
  FlagMaterialPayload,
  MaterialReviewsResponse,
  PostMaterialPayload,
  ProductReviewResponse,
} from "../types";

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
  userId,
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
  userId?: string;
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
      userId,
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
  userId?: string,
): Promise<ProductReviewResponse> => {
  try {
    const url = `/material/fetch-product/${id}`;
    const { data } = await axiosInstance.get(url, {
      params: userId ? { userId } : undefined,
    });
    return data?.data as ProductReviewResponse;
  } catch (error) {
    throw error;
  }
};

export const getMaterialReviews = async ({
  materialId,
  page,
  limit,
  sortBy = "mostRelevant",
}: {
  materialId: string;
  page: number;
  limit: number;
  sortBy?: string;
}): Promise<MaterialReviewsResponse | undefined> => {
  try {
    const url = `/material/fetch-product-reviews/${materialId}`;
    const { data } = await axiosInstance.get(url, {
      params: { page, limit, sortBy },
    });

    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const addMaterialReview = async (payload: AddMaterialReviewPayload) => {
  try {
    const { data } = await axiosInstance.post("/material/add-review", payload);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const compareMaterial = async (materialId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/material/compare-product/${materialId}`,
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const flagMaterial = async (
  materialId: string,
  payload: FlagMaterialPayload,
) => {
  try {
    const { data } = await axiosInstance.post(
      `/material/flag-product/${materialId}`,
      payload,
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};
