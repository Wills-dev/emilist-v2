import { axiosInstance } from "@/lib/axiosInstance";
import { PostMaterialPayload } from "../types";

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
