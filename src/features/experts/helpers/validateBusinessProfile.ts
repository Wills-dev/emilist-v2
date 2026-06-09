import { toast } from "sonner";
import { BusinessProfileState } from "@/features/experts/types";

export const validateBusinessProfile = (
  form: BusinessProfileState,
  images: File[],
) => {
  if (form.services.length === 0) {
    toast.error("Please select at least one service.");
    return false;
  }

  if (form.coverageArea.length === 0) {
    toast.error("Please select at least one coverage area.");
    return false;
  }

  if (!form.businessName.trim()) {
    toast.error("Business name is required.");
    return false;
  }

  if (!form.yearFounded.trim()) {
    toast.error("Year founded is required.");
    return false;
  }

  if (!form.numberOfEmployee.trim()) {
    toast.error("Number of employees is required.");
    return false;
  }

  if (!form.businessAddress.trim()) {
    toast.error("Business address is required.");
    return false;
  }

  if (!form.businessState.trim()) {
    toast.error("Business state is required.");
    return false;
  }

  if (!form.businessCountry.trim()) {
    toast.error("Business country is required.");
    return false;
  }

  if (!form.startingPrice.trim()) {
    toast.error("Starting price is required.");
    return false;
  }

  if (!form.currency.trim()) {
    toast.error("Currency is required.");
    return false;
  }

  if (!form.rateUnit.trim()) {
    toast.error("Rate unit is required.");
    return false;
  }

  if (!form.noticePeriod.trim()) {
    toast.error("Notice period is required.");
    return false;
  }

  if (!form.businessDescription.trim()) {
    toast.error("Business description is required.");
    return false;
  }

  if (images.length === 0) {
    toast.error("Please select at least one business image.");
    return false;
  }

  return true;
};

export const isBusinessTabComplete = (
  form: BusinessProfileState,
  images: File[],
): boolean => {
  if (
    form.services.length > 0 &&
    form.coverageArea.length > 0 &&
    form.businessName.trim() &&
    form.yearFounded.trim() &&
    form.numberOfEmployee.trim() &&
    form.businessAddress.trim() &&
    form.businessState.trim() &&
    form.businessCountry.trim() &&
    form.currency.trim() &&
    form.startingPrice.trim() &&
    form.rateUnit.trim() &&
    form.noticePeriod.trim() &&
    form.businessDescription.trim() &&
    images.length > 0
  ) {
    return true;
  }
  return false;
};
