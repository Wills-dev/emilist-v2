"use client";

import Link from "next/link";

import { useShallow } from "zustand/react/shallow";

import Button from "@/components/atoms/Button/Button";
import FormTitleWrapper from "@/components/atoms/FormTitleWrapper/FormTitleWrapper";
import InputWrapper from "../../InputWrapper/InputWrapper";
import SelectWrapper from "../../SelectWrapper/SelectWrapper";
import Label from "@/components/atoms/Label/Label";
import RichTextArea from "@/components/molecules/RichTextArea/RichTextArea";
import Select from "@/components/atoms/Select/Select";
import Input from "@/components/atoms/Input/Input";
import MultiImageInput from "../../MultiImageInput/MultiImageInput";

import { currencies } from "@/lib/constants/currencies";
import { countriesAndStates } from "@/lib/constants/countries";
import { quantityMetrics } from "@/lib/constants/qunatityUnits";
import { productCategories } from "@/features/materials/constants";
import { usePostMaterial } from "@/features/materials/hooks/usePostMaterial";
import { useMaterialStore } from "@/store/material/materialStore";
import { isMaterialFormComplete } from "@/features/materials/helpers/validateMaterialForm";
import { routes } from "@/lib/helpers/routes";

const PostMaterialForm = () => {
  const { isPending, handleSubmit, handleImageChange } = usePostMaterial();

  const { getPayload, setField, updateDeliveryLocation, removeImage } =
    useMaterialStore(
      useShallow((state) => ({
        setField: state.setField,
        updateDeliveryLocation: state.updateDeliveryLocation,
        removeImage: state.removeImage,
        getPayload: state.getPayload,
      })),
    );

  const name = useMaterialStore((state) => state.name);
  const brand = useMaterialStore((state) => state.brand);
  const category = useMaterialStore((state) => state.category);
  const description = useMaterialStore((state) => state.description);
  const price = useMaterialStore((state) => state.price);
  const priceMetric = useMaterialStore((state) => state.priceMetric);
  const currency = useMaterialStore((state) => state.currency);
  const availableQuantity = useMaterialStore(
    (state) => state.availableQuantity,
  );
  const quantityMetric = useMaterialStore((state) => state.quantityMetric);
  const imagePreviews = useMaterialStore((state) => state.imagePreviews);
  const merchantName = useMaterialStore((state) => state.merchantName);

  const deliveryLocations = useMaterialStore(
    (state) => state.deliveryLocations,
  );

  const selectedCountry = countriesAndStates.find(
    (item) => item.value === deliveryLocations[0].state,
  );

  const stateOptions = selectedCountry?.states ?? [];

  const payload = getPayload();

  return (
    <div className="">
      <div className="h-20 w-full" />
      <form onSubmit={handleSubmit} className="w-full space-y-12 pt-10 pb-16">
        {" "}
        <div className="space-y-4 w-full border-b border-[#E5E5E5] sm:pb-4 pb-2">
          <FormTitleWrapper
            title="Sell materials on Emilist"
            iconUrl="/assets/icons/list-todo.svg"
          />

          <div className="flex items-end justify-between gap-10">
            <p className="max-w-111.75 w-full text-[#737774] leading-6 max-sm:text-sm">
              List the materials you want to sell by filling the form below
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <InputWrapper
            title="Enter product name"
            name="name"
            value={name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Cement Bags"
          />
          <SelectWrapper
            title="Select item category"
            name="category"
            value={category}
            onChange={(e) => setField("category", e.target.value)}
            options={productCategories}
          />
          <InputWrapper
            title="Enter product brand"
            name="brand"
            value={brand}
            onChange={(e) => setField("brand", e.target.value)}
            placeholder="Dangote"
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" title="Describe your product" />
            <RichTextArea
              id="description"
              name="description"
              value={description}
              onChange={(value) => setField("description", value)}
              placeholder="Be as detailed as possible"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <InputWrapper
              title="Enter available product quantity"
              name="availableQuantity"
              value={availableQuantity}
              onChange={(e) => setField("availableQuantity", e.target.value)}
              placeholder="4,000"
            />{" "}
            <SelectWrapper
              title="Select metric (bag, kg, ton)"
              name="quantityMetric"
              value={quantityMetric}
              onChange={(e) => setField("quantityMetric", e.target.value)}
              options={quantityMetrics}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price" title="Enter product price" />
              <div className="grid grid-cols-3 gap-2.5">
                <div className="col-span-1">
                  <Select
                    id="currency"
                    name="currency"
                    value={currency}
                    onChange={(e) => setField("currency", e.target.value)}
                    options={currencies}
                    variant="tertiary"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    id="price"
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setField("price", e.target.value)}
                    placeholder="9,000"
                  />
                </div>
              </div>
            </div>
            <SelectWrapper
              title="Select metric (bag, kg, ton)"
              name="priceMetric"
              value={priceMetric}
              onChange={(e) => setField("priceMetric", e.target.value)}
              options={quantityMetrics}
            />
          </div>
          <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-6">
            <Label htmlFor="" title="Upload product image" />
            <MultiImageInput
              preview={imagePreviews}
              addImage={handleImageChange}
              removeImage={removeImage}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="description"
              title=" Select your delivery locations"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <Select
              id="state"
              name="state"
              value={deliveryLocations[0].state}
              onChange={(e) =>
                updateDeliveryLocation(0, "state", e.target.value)
              }
              options={countriesAndStates}
              variant="tertiary"
              placeholder="Nigeria"
            />
            <Select
              id="lga"
              name="lga"
              value={deliveryLocations[0].lga}
              onChange={(e) => updateDeliveryLocation(0, "lga", e.target.value)}
              options={stateOptions}
              variant="tertiary"
              placeholder="Select State"
            />
          </div>
          <InputWrapper
            title="Enter merchants full name"
            name="merchantName"
            value={merchantName}
            onChange={(e) => setField("merchantName", e.target.value)}
            placeholder="You can also enter a business name if you have one"
          />
        </div>
        <div className="gap-6 flex flex-col justify-center items-center">
          <Button
            variant="primary"
            type="submit"
            className="w-full h-11"
            loading={isPending}
            disabled={isMaterialFormComplete(payload)}
          >
            Proceed
          </Button>
          <div className="flex justify-center">
            <Link
              href={routes?.dashboard}
              className="text-center sm:text-sm text-xs text-[#18A154] font-exo flex items-center gap-1 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span className="text-[#18A154] font-semibold">
                Back to Dashboard
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostMaterialForm;
