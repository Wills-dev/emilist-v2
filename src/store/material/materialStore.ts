import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MaterialFormState } from "../types/material";
import { PostMaterialPayload } from "@/features/materials/types";

const defaultState = {
  name: "",
  category: "",
  subCategory: "",
  brand: "",
  description: "",
  availableQuantity: "",
  quantityMetric: "",
  price: "",
  priceMetric: "",
  currency: "NGN",
  merchantName: "",
  storeName: "",
  deliveryLocations: [{ state: "", lga: "" }],
  isDiscounted: false,
  images: [],
  imagePreviews: [],
};

export const useMaterialStore = create<MaterialFormState>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setField: (field, value) => set({ [field]: value }),

      addDeliveryLocation: () =>
        set((state) => ({
          deliveryLocations: [
            ...state.deliveryLocations,
            { state: "", lga: "" },
          ],
        })),

      updateDeliveryLocation: (index, field, value) =>
        set((state) => {
          const updated = [...state.deliveryLocations];
          updated[index] = { ...updated[index], [field]: value };
          return { deliveryLocations: updated };
        }),

      removeDeliveryLocation: (index) =>
        set((state) => ({
          deliveryLocations: state.deliveryLocations.filter(
            (_, i) => i !== index,
          ),
        })),
      removeImage: (index) =>
        set((state) => ({
          images: state.images.filter((_, i) => i !== index),
          imagePreviews: state.imagePreviews.filter((_, i) => i !== index),
        })),

      setImages: (files, preview) =>
        set({ images: files, imagePreviews: preview }),

      resetForm: () => set({ ...defaultState, images: [] }),

      getPayload: (): PostMaterialPayload => {
        const state = get();
        return {
          name: state.name,
          category: state.category,
          subCategory: state.subCategory,
          brand: state.brand,
          description: state.description,
          availableQuantity: Number(state.availableQuantity),
          quantityMetric: state.quantityMetric,
          price: Number(state.price),
          priceMetric: state.priceMetric,
          currency: state.currency,
          merchantName: state.merchantName,
          storeName: state.storeName,
          deliveryLocations: state.deliveryLocations,
          isDiscounted: state.isDiscounted,
          images: state.images,
        };
      },
    }),
    {
      name: "material-form-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        name: state.name,
        category: state.category,
        subCategory: state.subCategory,
        brand: state.brand,
        description: state.description,
        availableQuantity: state.availableQuantity,
        quantityMetric: state.quantityMetric,
        price: state.price,
        priceMetric: state.priceMetric,
        currency: state.currency,
        merchantName: state.merchantName,
        storeName: state.storeName,
        deliveryLocations: state.deliveryLocations,
        isDiscounted: state.isDiscounted,
      }),
    },
  ),
);
