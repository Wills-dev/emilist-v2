"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Select from "@/components/atoms/Select/Select";
import { currencies } from "@/lib/constants/currencies";
import { quantityMetrics } from "@/lib/constants/qunatityUnits";
import {
  formatInputTextNumberWithCommas,
  removeNumberCommas,
} from "@/lib/helpers/formatNumbers";
import { OtherSellerProduct } from "../../types";
import { useEditMaterial } from "../../hooks/useEditMaterial";

const getMetricValue = (metric: string) =>
  quantityMetrics.find(
    ({ value }) => value.toLowerCase() === metric.toLowerCase(),
  )?.value ?? metric;

const EditPriceModal = ({
  material,
  open,
  onClose,
}: {
  material: OtherSellerProduct;
  open: boolean;
  onClose: (open: boolean) => void;
}) => {
  const [price, setPrice] = useState(() =>
    formatInputTextNumberWithCommas(String(material.price)),
  );
  const [currency, setCurrency] = useState(material.currency);
  const [priceMetric, setPriceMetric] = useState(() =>
    getMetricValue(material.priceMetric),
  );
  const { updateMaterial, isUpdating } = useEditMaterial(() => onClose(false));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMaterial({
      productId: material._id,
      payload: {
        price: Number(removeNumberCommas(price)),
        currency,
        priceMetric: priceMetric.toLowerCase(),
      },
    });
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Edit Price"
      description="Update the price of this product listing"
      className="max-w-lg"
      headerClassName="border-b border-[#ECECEC] pb-4"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <Label htmlFor="edit-price" title="Change product price" />
          <div className="grid grid-cols-[110px_1fr] gap-2">
            <Select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              options={currencies}
              variant="tertiary"
              aria-label="Currency"
            />
            <Input
              id="edit-price"
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(event) =>
                setPrice(formatInputTextNumberWithCommas(event.target.value))
              }
              placeholder="9,000"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-price-unit" title="Unit" />
          <Select
            id="edit-price-unit"
            value={priceMetric}
            onChange={(event) => setPriceMetric(event.target.value)}
            options={quantityMetrics}
          />
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="default"
            className="h-11 flex-1"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="h-11 flex-1"
            loading={isUpdating}
            disabled={!price || !priceMetric}
          >
            Confirm
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditPriceModal;
