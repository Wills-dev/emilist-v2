"use client";

import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

import { validateImage } from "@/lib/helpers/imageValidation";
import { OtherSellerProduct } from "../../types";
import { useDeleteMaterialImage } from "../../hooks/useEditMaterial";
import { ExistingMaterialImage } from "./types";

export const useListingImages = (material: OtherSellerProduct) => {
  const [existingImages, setExistingImages] = useState(material.images);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const { deleteExistingImage, deletingImageId } = useDeleteMaterialImage();

  const addImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const error = files.map(validateImage).find(Boolean);
    if (error) {
      toast.error(error);
      return;
    }

    setNewImages((current) => [...current, ...files]);
    setNewPreviews((current) => [
      ...current,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    event.target.value = "";
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewImages((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
    setNewPreviews((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const removeExistingImage = async (image: ExistingMaterialImage) => {
    await deleteExistingImage({ productId: material._id, imageId: image._id });
    setExistingImages((current) =>
      current.filter((item) => item._id !== image._id),
    );
    toast.success("Image deleted.");
  };

  return {
    existingImages,
    newImages,
    newPreviews,
    addImages,
    removeNewImage,
    removeExistingImage,
    deletingImageId,
  };
};
