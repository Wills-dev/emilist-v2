import { reportFormError, hasRichText } from "@/lib/helpers/formValidation";
import { BusinessProfileState } from "@/features/experts/types";

export const getBusinessProfileError = (form: BusinessProfileState, images: File[]) => {
  if (!form.businessName.trim()) return { field: "businessName", message: "Business name is required." };
  if (!form.yearFounded.trim()) return { field: "yearFounded", message: "Year founded is required." };
  if (!form.numberOfEmployee.trim()) return { field: "numberOfEmployee", message: "Number of employees is required." };
  if (!form.businessCountry.trim()) return { field: "businessCountry", message: "Business country is required." };
  if (!form.businessState.trim()) return { field: "businessState", message: "Business state is required." };
  if (!form.businessAddress.trim()) return { field: "businessAddress", message: "Business address is required." };
  if (!form.services.length) return { field: "services", message: "Please select at least one service." };
  if (!form.coverageArea.length) return { field: "coverageArea", message: "Please select at least one coverage area." };
  if (!form.currency.trim()) return { field: "currency", message: "Currency is required." };
  if (!form.startingPrice.trim()) return { field: "startingPrice", message: "Starting price is required." };
  if (!form.rateUnit.trim()) return { field: "rateUnit", message: "Rate unit is required." };
  if (!form.noticePeriod.trim()) return { field: "noticePeriod", message: "Notice period is required." };
  if (!hasRichText(form.businessDescription)) return { field: "businessDescription", message: "Business description is required." };
  if (!images.length) return { field: "businessImages", message: "Please select at least one business image." };
};

export const validateBusinessProfile = (form: BusinessProfileState, images: File[]) => {
  const error = getBusinessProfileError(form, images);
  return error ? reportFormError(error.field, error.message) : true;
};

export const isBusinessTabComplete = (form: BusinessProfileState, images: File[]) => !getBusinessProfileError(form, images);
