import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Select from "@/components/atoms/Select/Select";
import RichTextArea from "@/components/molecules/RichTextArea/RichTextArea";
import { countriesAndStates } from "@/lib/constants/countries";
import { currencies } from "@/lib/constants/currencies";
import { quantityMetrics } from "@/lib/constants/qunatityUnits";
import {
  formatInputTextNumber,
  formatInputTextNumberWithCommas,
} from "@/lib/helpers/formatNumbers";
import { EditListingFormValues, SetEditListingField } from "./types";

const EditListingFields = ({
  form,
  setField,
}: {
  form: EditListingFormValues;
  setField: SetEditListingField;
}) => {
  const selectedCountry = countriesAndStates.find(
    (item) => item.value === form.state,
  );
  const stateOptions = selectedCountry?.states ?? [];

  return (
    <>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Product name">
        <Input
          value={form.name}
          onChange={(event) => setField("name", event.target.value)}
        />
      </Field>
      <Field label="Product brand">
        <Input
          value={form.brand}
          onChange={(event) => setField("brand", event.target.value)}
        />
      </Field>
    </div>

    <Field label="Product description">
      <RichTextArea
        value={form.description}
        onChange={(value) => setField("description", value)}
        placeholder="Describe your product"
      />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Enter available product quantity">
        <Input
          type="text"
          inputMode="numeric"
          value={form.availableQuantity}
          onChange={(event) =>
            setField(
              "availableQuantity",
              formatInputTextNumber(event.target.value),
            )
          }
        />
      </Field>
      <Field label="Select metric unit (bag, kg, ton)">
        <Select
          value={form.quantityMetric}
          onChange={(event) => setField("quantityMetric", event.target.value)}
          options={quantityMetrics}
        />
      </Field>
    </div>

    <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
      <Field label="Change product price">
        <div className="grid grid-cols-[100px_1fr] gap-2">
          <Select
            value={form.currency}
            onChange={(event) => setField("currency", event.target.value)}
            options={currencies}
            variant="tertiary"
            aria-label="Currency"
          />
          <Input
            type="text"
            inputMode="decimal"
            value={form.price}
            onChange={(event) =>
              setField(
                "price",
                formatInputTextNumberWithCommas(event.target.value),
              )
            }
          />
        </div>
      </Field>
      <Field label="Unit">
        <Select
          value={form.priceMetric}
          onChange={(event) => setField("priceMetric", event.target.value)}
          options={quantityMetrics}
        />
      </Field>
    </div>

    <Field label="Select your delivery location">
      <div className="grid gap-2 sm:grid-cols-2">
        <Select
          value={form.state}
          onChange={(event) => setField("state", event.target.value)}
          options={countriesAndStates}
          placeholder="Nigeria"
          variant="tertiary"
        />
        <Select
          value={form.lga}
          onChange={(event) => setField("lga", event.target.value)}
          options={stateOptions}
          placeholder="Select State"
          variant="tertiary"
        />
      </div>
    </Field>

    <Field label="Merchant or business name">
      <Input
        value={form.merchantName}
        onChange={(event) => setField("merchantName", event.target.value)}
      />
    </Field>
    </>
  );
};

export const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label htmlFor="" title={label} />
    {children}
  </div>
);

export default EditListingFields;
