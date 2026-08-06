import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Select from "@/components/atoms/Select/Select";
import SettingsEditActions from "../SettingsEditActions/SettingsEditActions";

import { countriesAndStates } from "@/lib/constants/countries";
import { LANGUAGES } from "@/lib/constants/languages";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";
import { UserSettingsFormValues } from "../../types";

interface UserBiodataProps {
  values: UserSettingsFormValues;
  editing: boolean;
  loading: boolean;
  onChange: (field: keyof UserSettingsFormValues, value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const ReadOnlyValue = ({ children }: { children?: string }) => (
  <div className="flex min-h-12 items-center rounded-[10px] bg-[#F7F7F7] px-4 text-[#737774]">
    {children || "Not provided"}
  </div>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <Label htmlFor={label.toLowerCase().replaceAll(" ", "-")} title={label} />
    {children}
  </div>
);

const UserBiodata = ({
  values,
  editing,
  loading,
  onChange,
  onEdit,
  onSave,
  onCancel,
}: UserBiodataProps) => {
  const selectedCountry = countriesAndStates.find(
    (country) => country.value === values.country,
  );
  const stateOptions = selectedCountry?.states ?? [];
  const actionProps = { editing, loading, onEdit, onSave, onCancel };

  return (
    <section className="rounded-lg bg-white p-5 max-sm:p-4">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="font-exo font-medium text-[#474C48]">User Biodata</h2>
        <SettingsEditActions
          {...actionProps}
          className={editing ? "max-sm:hidden" : ""}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-md:grid-cols-1">
        <Field label="First name">
          {editing ? (
            <Input
              id="first-name"
              value={values.firstName}
              onChange={(event) => onChange("firstName", event.target.value)}
            />
          ) : (
            <ReadOnlyValue>{values.firstName}</ReadOnlyValue>
          )}
        </Field>
        <Field label="Last name">
          {editing ? (
            <Input
              id="last-name"
              value={values.lastName}
              onChange={(event) => onChange("lastName", event.target.value)}
            />
          ) : (
            <ReadOnlyValue>{values.lastName}</ReadOnlyValue>
          )}
        </Field>
        <Field label="Mobile phone number">
          <div className="grid grid-cols-7 gap-2">
            <div className="col-span-2">
              {editing ? (
                <Input
                  aria-label="Country code"
                  value={values.countryCode}
                  onChange={(event) =>
                    onChange(
                      "countryCode",
                      `+${formatInputTextNumber(event.target.value)}`,
                    )
                  }
                  inputMode="tel"
                  placeholder="+234"
                />
              ) : (
                <ReadOnlyValue>{values.countryCode}</ReadOnlyValue>
              )}
            </div>
            <div className="col-span-5">
              {editing ? (
                <Input
                  aria-label="Mobile number"
                  value={values.mobile}
                  onChange={(event) =>
                    onChange(
                      "mobile",
                      formatInputTextNumber(event.target.value),
                    )
                  }
                  inputMode="tel"
                  placeholder="Enter 10 digit number"
                />
              ) : (
                <ReadOnlyValue>{values.mobile}</ReadOnlyValue>
              )}
            </div>
          </div>
        </Field>
        <Field label="Language">
          {editing ? (
            <Select
              value={values.language}
              onChange={(event) => onChange("language", event.target.value)}
              options={LANGUAGES}
              placeholder="Select language"
            />
          ) : (
            <ReadOnlyValue>{values.language}</ReadOnlyValue>
          )}
        </Field>
        <Field label="House address">
          {editing ? (
            <Input
              value={values.houseAddress}
              onChange={(event) => onChange("houseAddress", event.target.value)}
            />
          ) : (
            <ReadOnlyValue>{values.houseAddress}</ReadOnlyValue>
          )}
        </Field>
        <Field label="City">
          {editing ? (
            <Input
              value={values.city}
              onChange={(event) => onChange("city", event.target.value)}
            />
          ) : (
            <ReadOnlyValue>{values.city}</ReadOnlyValue>
          )}
        </Field>
        <Field label="State">
          {editing ? (
            <Select
              value={values.state}
              onChange={(event) => onChange("state", event.target.value)}
              options={stateOptions}
              placeholder="Select state"
            />
          ) : (
            <ReadOnlyValue>{values.state}</ReadOnlyValue>
          )}
        </Field>
        <Field label="Country">
          {editing ? (
            <Select
              value={values.country}
              onChange={(event) => {
                onChange("country", event.target.value);
                onChange("state", "");
              }}
              options={countriesAndStates}
              placeholder="Select country"
            />
          ) : (
            <ReadOnlyValue>{values.country}</ReadOnlyValue>
          )}
        </Field>
      </div>

      {editing && (
        <SettingsEditActions
          {...actionProps}
          className="mt-8 justify-end sm:hidden"
        />
      )}
    </section>
  );
};

export default UserBiodata;
