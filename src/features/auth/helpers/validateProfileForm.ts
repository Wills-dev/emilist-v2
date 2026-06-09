import { toast } from "sonner";
import { CompleteProfileForm } from "../types";

export const validateProfileForm = (form: CompleteProfileForm) => {
  if (!form.firstName.trim()) {
    toast.error("First name is required.");
    return false;
  }

  if (!form.lastName.trim()) {
    toast.error("Last name is required.");
    return false;
  }

  if (!form.countryCode.trim()) {
    toast.error("Country code is required.");
    return false;
  }

  if (!form.mobile.trim()) {
    toast.error("Mobile number is required.");
    return false;
  }

  if (form.language.length === 0) {
    toast.error("Please select at least one language.");
    return false;
  }

  if (!form.houseAddress.trim()) {
    toast.error("House address is required.");
    return false;
  }

  if (!form.state.trim()) {
    toast.error("State is required.");
    return false;
  }

  if (!form.city.trim()) {
    toast.error("City is required.");
    return false;
  }

  if (!form.country.trim()) {
    toast.error("Country is required.");
    return false;
  }

  if (!form.bio.trim()) {
    toast.error("Bio is required.");
    return false;
  }

  return true;
};

export const isFormComplete = (form: CompleteProfileForm) => {
  return (
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.countryCode.trim() !== "" &&
    form.mobile.trim() !== "" &&
    form.language.length > 0 &&
    form.houseAddress.trim() !== "" &&
    form.state.trim() !== "" &&
    form.city.trim() !== "" &&
    form.country.trim() !== "" &&
    form.bio.trim() !== ""
  );
};
