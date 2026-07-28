import { axiosInstance } from "@/lib/axiosInstance";
import {
  AddMaterialReviewPayload,
  FlagMaterialPayload,
  MaterialReviewsResponse,
  MaterialListResponse,
  OtherSellerProductsResponse,
  SimilarProductsResponse,
  PostMaterialPayload,
  ProductReviewResponse,
  UpdateMaterialPayload,
  ComparedProductsResponse,
} from "../types";

const appendMaterialFormData = (
  formData: FormData,
  payload: UpdateMaterialPayload,
) => {
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || key === "images" || key === "deliveryLocations")
      return;
    formData.append(key, String(value));
  });

  payload.deliveryLocations?.forEach((location, index) => {
    formData.append(`deliveryLocations[${index}][state]`, location.state);
    formData.append(`deliveryLocations[${index}][lga]`, location.lga);
  });
  payload.images?.forEach((image) => formData.append("files", image));
};

export const updateMaterial = async ({
  productId,
  payload,
}: {
  productId: string;
  payload: UpdateMaterialPayload;
}) => {
  const formData = new FormData();
  appendMaterialFormData(formData, payload);
  const { data } = await axiosInstance.patch(
    `/material/update-product/${productId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data?.data;
};

export const deleteMaterialImage = async ({
  productId,
  imageId,
}: {
  productId: string;
  imageId: string;
}) => {
  const { data } = await axiosInstance.delete(
    `/material/delete-product/${productId}/image/${imageId}`,
  );
  return data?.data;
};

export const archiveMaterial = async (productId: string) => {
  const { data } = await axiosInstance.delete(
    `/material/delete-product/${productId}`,
  );
  return data?.data;
};

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

export interface MaterialQueryParams {
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
  location?: string | null;
  rating?: string | null;
  deliveryTime?: string | null;
}

const getMaterialQueryParams = ({
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
  rating,
  location,
  deliveryTime,
}: MaterialQueryParams) =>
  Object.fromEntries(
    Object.entries({
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
      merchantRating: rating,
      location,
      deliveryTime,
    }).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

export const getMaterial = async (
  query: MaterialQueryParams,
): Promise<MaterialListResponse> => {
  try {
    const url = `/material/fetch-all-products`;

    const { data } = await axiosInstance.get(url, {
      params: getMaterialQueryParams(query),
    });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const getLikedMaterials = async (
  query: MaterialQueryParams,
): Promise<MaterialListResponse> => {
  const { data } = await axiosInstance.get("/material/fetch-liked-products", {
    params: getMaterialQueryParams(query),
  });

  return data?.data;
};

export const getComparedMaterials =
  async (): Promise<ComparedProductsResponse> => {
  const { data } = await axiosInstance.get(
    "/material/fetch-compared-products",
  );

  return data?.data;
};

export const getOtherProductsByUser = async ({
  userId,
  page = 1,
  limit = 2,
}: {
  userId: string;
  page?: number;
  limit?: number;
}): Promise<OtherSellerProductsResponse> => {
  const { data } = await axiosInstance.get(
    `/material/fetch-other-products-by-user/${userId}`,
    { params: { page, limit } },
  );

  return data?.data;
};

export const getSimilarProducts = async ({
  productId,
  page = 1,
  limit = 10,
  userId,
}: {
  productId: string;
  page?: number;
  limit?: number;
  userId?: string;
}): Promise<SimilarProductsResponse> => {
  const { data } = await axiosInstance.get(
    `/material/fetch-similar-products/${productId}`,
    {
      params: {
        page,
        limit,
        ...(userId ? { userId } : {}),
      },
    },
  );

  return data?.data;
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
  search,
}: {
  materialId: string;
  page: number;
  limit: number;
  sortBy?: string;
  search?: string | null;
}): Promise<MaterialReviewsResponse | undefined> => {
  try {
    const url = `/material/fetch-product-reviews/${materialId}`;
    const { data } = await axiosInstance.get(url, {
      params: { page, limit, sortBy, search: search || undefined },
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

export const likeMaterial = async (materialId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/material/like-product/${materialId}`,
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const unlikeMaterial = async (materialId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/material/unlike-product/${materialId}`,
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const rateReviewHelpfulness = async ({
  reviewId,
  isHelpful,
}: {
  reviewId: string;
  isHelpful: boolean;
}) => {
  const { data } = await axiosInstance.post(
    `/material/review/${reviewId}/helpful`,
    undefined,
    { params: { isHelpful } },
  );

  return data?.data;
};
