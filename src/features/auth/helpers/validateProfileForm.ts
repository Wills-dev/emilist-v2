import { reportFormError, hasRichText } from "@/lib/helpers/formValidation";
import { CompleteProfileForm } from "../types";

export const getProfileFormError = (form: CompleteProfileForm) => {
  if (!form.firstName.trim()) return { field: "firstName", message: "First name is required." };
  if (!form.lastName.trim()) return { field: "lastName", message: "Last name is required." };
  if (!form.countryCode.trim()) return { field: "countryCode", message: "Country code is required." };
  if (!form.mobile.trim()) return { field: "mobile", message: "Mobile number is required." };
  if (!form.languages?.length) return { field: "languages", message: "Language is required." };
  if (!form.country.trim()) return { field: "country", message: "Country is required." };
  if (!form.state.trim()) return { field: "state", message: "State is required." };
  if (!form.city.trim()) return { field: "city", message: "City is required." };
  if (!form.houseAddress.trim()) return { field: "houseAddress", message: "House address is required." };
  if (!hasRichText(form.bio)) return { field: "bio", message: "Bio is required." };
};

export const validateProfileForm = (form: CompleteProfileForm) => {
  const error = getProfileFormError(form);
  return error ? reportFormError(error.field, error.message) : true;
};

export const isFormComplete = (form: CompleteProfileForm) => !getProfileFormError(form);
