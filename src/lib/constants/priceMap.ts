import { PriceRange } from "../hooks/useFilters";

export const priceMap = {
  "<20": {
    min: "0",
    max: "20000",
  },
  "21-50": {
    min: "20001",
    max: "50000",
  },
  "51-100": {
    min: "50001",
    max: "100000",
  },
  "101-200": {
    min: "100001",
    max: "200000",
  },
  "201-500": {
    min: "200001",
    max: "500000",
  },
  ">500": {
    min: "500001",
    max: null,
  },
};

export const priceOptions: { label: string; value: PriceRange }[] = [
  { label: "< ₦20k", value: "<20" },
  { label: "₦21k - ₦50k", value: "21-50" },
  { label: "₦51k - ₦100k", value: "51-100" },
  { label: "₦101k - ₦200k", value: "101-200" },
  { label: "₦201k - ₦500k", value: "201-500" },
  { label: "> ₦500k", value: ">500" },
];
