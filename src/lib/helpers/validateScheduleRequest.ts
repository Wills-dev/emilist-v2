import { toast } from "sonner";
import { ScheduledFormType } from "../types/enterprise";

export const validateScheduleRequest = (scheduleForm: ScheduledFormType) => {
  if (!scheduleForm.firstName.trim()) {
    toast.error("First name is required");
    return false;
  }

  if (!scheduleForm.lastName.trim()) {
    toast.error("Last name is required");
    return false;
  }

  if (!scheduleForm.email.trim()) {
    toast.error("Email is required");
    return false;
  }

  if (!scheduleForm.mobile.trim()) {
    toast.error("Mobile number is required");
    return false;
  }

  if (!scheduleForm.title.trim()) {
    toast.error("Title is required");
    return false;
  }

  if (!scheduleForm.services.length) {
    toast.error("Select at least one service");
    return false;
  }

  if (!scheduleForm.locations.length) {
    toast.error("Select at least one location");
    return false;
  }

  if (!scheduleForm.description.trim()) {
    toast.error("Description is required");
    return false;
  }

  if (!scheduleForm.startDate) {
    toast.error("Start date is required");
    return false;
  }

  if (!scheduleForm.endDate) {
    toast.error("End date is required");
    return false;
  }

  if (new Date(scheduleForm.endDate) < new Date(scheduleForm.startDate)) {
    toast.error("End date cannot be before start date");
    return false;
  }

  if (!scheduleForm.currency) {
    toast.error("Currency is required");
    return false;
  }

  if (!scheduleForm.amount) {
    toast.error("Amount is required");
    return false;
  }

  if (Number(scheduleForm.amount) <= 0) {
    toast.error("Amount must be greater than 0");
    return false;
  }

  if (!scheduleForm.rateUnit) {
    toast.error("Rate unit is required");
    return false;
  }

  if (!scheduleForm.level) {
    toast.error("Level is required");
    return false;
  }

  if (!scheduleForm.expertId) {
    toast.error("Expert ID is required");
    return false;
  }

  return true;
};

export const isEmptyScheduleRequest = (scheduleForm: ScheduledFormType) => {
  return (
    !scheduleForm.email &&
    !scheduleForm.firstName &&
    !scheduleForm.lastName &&
    !scheduleForm.mobile &&
    !scheduleForm.countryCode &&
    !scheduleForm.title &&
    scheduleForm.services.length === 0 &&
    scheduleForm.locations.length === 0 &&
    !scheduleForm.description &&
    !scheduleForm.startDate &&
    !scheduleForm.endDate &&
    !scheduleForm.currency &&
    !scheduleForm.amount &&
    !scheduleForm.rateUnit &&
    !scheduleForm.level &&
    !scheduleForm.expertId
  );
};
