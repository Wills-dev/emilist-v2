import { toast } from "sonner";
import { ApiErrorData, ApiErrorResponse } from "../types/error";
import { AxiosError } from "axios";

export const promiseErrorFunction = (
  error: AxiosError<ApiErrorData> | ApiErrorResponse | unknown,
) => {
  const data = (error as ApiErrorResponse)?.response?.data;

  if (!data) {
    return toast.error("Something went wrong. Please try again.");
  }

  if (
    Array.isArray(data.errors) &&
    data.errors.length > 0 &&
    typeof data.errors[0] === "object"
  ) {
    return toast.error(data.errors[0].message);
  }

  if (
    Array.isArray(data.errors) &&
    data.errors.length > 0 &&
    typeof data.errors[0] === "string"
  ) {
    return toast.error(data.errors[0]);
  }

  if (Array.isArray(data.message) && data.message.length > 0) {
    return toast.error(data.message[0]);
  }

  if (typeof data.message === "string") {
    return toast.error(data.message);
  }

  return toast.error("Internal Server Error! Please contact support.");
};
