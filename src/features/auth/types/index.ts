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

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
}
