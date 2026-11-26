import { reportFormError, hasRichText } from "@/lib/helpers/formValidation";
import { PostMaterialPayload } from "../types";

export const getMaterialFormError = (form: PostMaterialPayload) => {
  if (!form.name.trim()) return { field: "name", message: "Product name is required." };
  if (!form.category.trim()) return { field: "category", message: "Category is required." };
  if (!form.brand.trim()) return { field: "brand", message: "Brand is required." };
  if (!hasRichText(form.description)) return { field: "description", message: "Product description is required." };
  if (!Number.isFinite(form.availableQuantity) || form.availableQuantity < 1) return { field: "availableQuantity", message: "Enter an available quantity of at least one." };
  if (!form.quantityMetric.trim()) return { field: "quantityMetric", message: "Quantity metric is required." };
  if (!form.currency.trim()) return { field: "currency", message: "Currency is required." };
  if (!Number.isFinite(form.price) || form.price <= 0) return { field: "price", message: "Enter a price greater than zero." };
  if (!form.priceMetric.trim()) return { field: "priceMetric", message: "Price metric is required." };
  if (!form.images?.length) return { field: "image", message: "Please select at least one product image." };
  if (!form.deliveryLocations.length || form.deliveryLocations.some((l) => !l.state)) return { field: "state", message: "Please select your delivery country." };
  if (form.deliveryLocations.some((l) => !l.lga)) return { field: "lga", message: "Please select your delivery state." };
  if (!form.merchantName.trim()) return { field: "merchantName", message: "Merchant name or business name is required." };
};

export const validateMaterialForm = (form: PostMaterialPayload) => {
  const error = getMaterialFormError(form);
  return error ? reportFormError(error.field, error.message) : true;
};

export const isMaterialFormComplete = (form: PostMaterialPayload): boolean => Boolean(getMaterialFormError(form));
