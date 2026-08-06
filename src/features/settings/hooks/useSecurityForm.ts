"use client";

import { useState } from "react";
import { toast } from "sonner";

import { SecurityFormValues } from "../types/security";

const initialValues: SecurityFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const useSecurityForm = () => {
  const [values, setValues] = useState(initialValues);

  const updateField = (field: keyof SecurityFormValues, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const handleChangePassword = () => {
    if (!values.currentPassword || !values.newPassword || !values.confirmPassword) {
      toast.error("Complete all password fields.");
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (values.newPassword.length < 8) {
      toast.error("New password must contain at least 8 characters.");
      return;
    }

    toast.info("Password change is ready for the security endpoint.");
  };

  return {
    values,
    updateField,
    handleChangePassword,
  };
};
