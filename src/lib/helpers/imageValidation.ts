const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const validateImage = (file: File) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only PNG, JPG, JPEG allowed";
  }

  if (file.size > MAX_SIZE) {
    return "Image must not exceed 5MB";
  }

  return null;
};
