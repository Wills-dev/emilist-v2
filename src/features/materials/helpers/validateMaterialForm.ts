import { toast } from "sonner";
import { PostMaterialPayload } from "../types";

export const validateMaterialForm = (form: PostMaterialPayload) => {
  if (!form.name.trim()) {
    toast.error("Product name is required.");
    return false;
  }

  if (!form.category.trim()) {
    toast.error("Category is required.");
    return false;
  }

  if (!form.brand.trim()) {
    toast.error("Brand is required.");
    return false;
  }

  if (!form.availableQuantity || form.availableQuantity < 1) {
    toast.error("Merchant Name or Business name is required.");
    return false;
  }

  if (!form.quantityMetric.trim()) {
    toast.error("Quantity metric is required.");
    return false;
  }

  if (!form.currency.trim()) {
    toast.error("Currency is required.");
    return false;
  }

  if (!form.price || form.price === 0) {
    toast.error("Price is required.");
    return false;
  }

  if (!form.priceMetric.trim()) {
    toast.error("Price metric is required.");
    return false;
  }

  if (form?.images?.length === 0) {
    toast.error("Please select at least one product image.");
    return false;
  }

  if (form.deliveryLocations.some((l) => !l.state || !l.lga)) {
    toast.error("Please complete all delivery locations");
    return;
  }

  if (!form.merchantName.trim()) {
    toast.error("Merchant Name or Business name is required.");
    return false;
  }

  //   if (!form.subCategory.trim()) {
  //     toast.error("Sub category is required.");
  //     return false;
  //   }

  //   if (!form.storeName.trim()) {
  //     toast.error("Store name is required.");
  //     return false;
  //   }

  return true;
};

export const isMaterialFormComplete = (form: PostMaterialPayload): boolean => {
  if (
    form.name.trim() === "" ||
    form.category.trim() === "" ||
    form.brand.trim() === "" ||
    !form.availableQuantity ||
    form.availableQuantity < 1 ||
    form.quantityMetric.trim() === "" ||
    form.currency.trim() === "" ||
    !form.price ||
    form.price === 0 ||
    form.priceMetric.trim() === "" ||
    form?.images?.length === 0 ||
    form.deliveryLocations.some((l) => !l.state || !l.lga) ||
    form.merchantName.trim() === ""
  ) {
    return true;
  }
  return false;
};
