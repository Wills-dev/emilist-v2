export const priceMap = {
  "<20": {
    min: 0,
    max: 20,
  },
  "21-50": {
    min: 21,
    max: 50,
  },
  "51-100": {
    min: 51,
    max: 100,
  },
  "101-200": {
    min: 101,
    max: 200,
  },
  "201-500": {
    min: 201,
    max: 500,
  },
  ">500": {
    min: 500,
    max: null,
  },
};

export const priceOptions = [
  { label: "< ₦20k", value: "<20" },
  { label: "₦21k - ₦50k", value: "21-50" },
  { label: "₦51k - ₦100k", value: "51-100" },
  { label: "₦101k - ₦200k", value: "101-200" },
  { label: "₦201k - ₦500k", value: "201-500" },
  { label: "> ₦500k", value: ">500" },
];
