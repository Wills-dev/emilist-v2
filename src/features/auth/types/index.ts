import { ChangeEvent } from "react";

export interface AuthType {
  email: string;
  password: string;
}

export interface OtpType {
  email: string;
  otp: string;
}

export interface ResetPasswordType {
  email: string;
  otp: string;
  newPassword: string;
}

export interface CompleteProfileForm {
  firstName: string;
  lastName: string;
  countryCode: string;
  mobile: string;
  language: string[];
  houseAddress: string;
  state: string;
  city: string;
  country: string;
  bio: string;
  image?: File | null;
}

export interface ExpertProfileFormProps {
  form: CompleteProfileForm;
  imagePreview: string;
  handleChange: (key: keyof CompleteProfileForm, value: unknown) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteImage: () => void;
  toggleLanguage: (lang: string) => void;
  switchTab: (tab: "business-profile" | "profile" | "experiences") => void;
}
