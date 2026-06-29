import { axiosInstance } from "@/lib/axiosInstance";
import { AuthType, OtpType, ResetPasswordType } from "../types";

export const login = async ({ email, password }: AuthType) => {
  try {
    const url = `/auth/login`;
    const { data } = await axiosInstance.post(url, { email, password });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const register = async ({ email, password }: AuthType) => {
  try {
    const url = `/auth/sign-up`;
    const { data } = await axiosInstance.post(url, { email, password });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async ({ email, otp }: OtpType) => {
  try {
    const url = `/auth/verify-email`;
    const { data } = await axiosInstance.post(url, { email, otp });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const resendOtp = async ({ email }: { email: string }) => {
  try {
    const url = `/auth/resend-otp`;
    const { data } = await axiosInstance.post(url, { email });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const url = `/auth/forgot-password`;
    const { data } = await axiosInstance.post(url, { email });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const verifyForgotPasswordOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  try {
    const url = `/auth/verify-password-otp`;
    const { data } = await axiosInstance.post(url, { email, otp });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async ({
  email,
  newPassword,
}: ResetPasswordType) => {
  try {
    const url = `/auth/reset-password`;
    const { data } = await axiosInstance.post(url, { email, newPassword });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const url = `/auth/change-password`;
    const { data } = await axiosInstance.post(url, {
      currentPassword,
      newPassword,
    });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const getGoogleAuthUrl = async () => {
  try {
    const url = `/auth/google`;
    const { data } = await axiosInstance.post(url);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const url = `/auth/current-user`;
    const { data } = await axiosInstance.get(url);
    return data?.data;
  } catch (error) {
    throw error;
  }
};
