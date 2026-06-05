import { ChangeEvent, useState } from "react";
import { CompleteProfileForm } from "../types";
import { toast } from "sonner";

const MAX_SIZE = 5 * 1024 * 1024;

export const useUpdateUserProfileState = () => {
  const [form, setForm] = useState<CompleteProfileForm>({
    firstName: "",
    lastName: "",
    countryCode: "+234",
    mobile: "",
    language: [],
    houseAddress: "",
    state: "",
    city: "",
    country: "",
    bio: "",
    image: null,
  });

  const isFormComplete = () => {
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

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_SIZE) {
      toast.error("Image size cannot exceed 5MB.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const deleteImage = () => {
    setForm((prev) => ({
      ...prev,
      image: null,
    }));

    setImagePreview("");
  };

  const toggleLanguage = (language: string) => {
    setForm((prev) => ({
      ...prev,
      language: prev.language.includes(language)
        ? prev.language.filter((l) => l !== language)
        : [...prev.language, language],
    }));
  };

  return {
    form,
    imagePreview,
    handleChange,
    handleImageChange,
    deleteImage,
    toggleLanguage,
    setImagePreview,
    setForm,
    isFormComplete,
  };
};
