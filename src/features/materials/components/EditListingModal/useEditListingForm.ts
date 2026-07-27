"use client";

import { FormEvent, useState } from "react";

import { removeNumberCommas } from "@/lib/helpers/formatNumbers";
import { OtherSellerProduct } from "../../types";
import { useUpdateMaterial } from "../../hooks/useEditMaterial";
import { getInitialEditListingValues } from "./helpers";
import { EditListingFormValues } from "./types";

export const useEditListingForm = ({
  material,
  images,
  onSuccess,
}: {
  material: OtherSellerProduct;
  images: File[];
  onSuccess: () => void;
}) => {
  const [form, setForm] = useState(() =>
    getInitialEditListingValues(material),
  );
  const { updateMaterial, isUpdating } = useUpdateMaterial(onSuccess);

  const setField = (field: keyof EditListingFormValues, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMaterial({
      productId: material._id,
      payload: {
        name: form.name,
        brand: form.brand,
        description: form.description,
        availableQuantity: Number(removeNumberCommas(form.availableQuantity)),
        quantityMetric: form.quantityMetric.toLowerCase(),
        price: Number(removeNumberCommas(form.price)),
        currency: form.currency,
        priceMetric: form.priceMetric.toLowerCase(),
        merchantName: form.merchantName,
        deliveryLocations: [{ state: form.state, lga: form.lga }],
        images,
      },
    });
  };

  const canSubmit = Boolean(
    form.name &&
      form.availableQuantity &&
      form.price &&
      form.quantityMetric &&
      form.priceMetric,
  );

  return { form, setField, handleSubmit, canSubmit, isUpdating };
};
